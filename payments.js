// SomniWatch — Paystack Payment Routes
// Handles: initialize transaction, webhook, plan lookup

const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();

// ── Plan definitions (amounts in kobo — multiply ₦ by 100) ──────
const PLANS = {
  solo_monthly:    { name: 'Solo Monthly',    amount: 250000,   interval: 'monthly',  tier: 'solo' },
  solo_yearly:     { name: 'Solo Yearly',     amount: 2400000,  interval: 'annually', tier: 'solo' },
  couples_monthly: { name: 'Couples Monthly', amount: 400000,   interval: 'monthly',  tier: 'couples' },
  couples_yearly:  { name: 'Couples Yearly',  amount: 3800000,  interval: 'annually', tier: 'couples' },
  couples_founders:{ name: 'Couples Founders',amount: 2800000,  interval: 'annually', tier: 'couples', founders: true },
  team_monthly:    { name: 'Team Monthly',    amount: 950000,   interval: 'monthly',  tier: 'team' },
  team_yearly:     { name: 'Team Yearly',     amount: 9000000,  interval: 'annually', tier: 'team' },
};

// ── Initialize Paystack transaction ─────────────────────────────
// POST /api/payment/initialize
// Body: { email, planId, userName }
router.post('/initialize', async (req, res) => {
  const { email, planId, userName } = req.body;

  if (!email || !planId) {
    return res.status(400).json({ error: 'email and planId are required' });
  }

  const plan = PLANS[planId];
  if (!plan) {
    return res.status(400).json({ error: 'Invalid plan ID' });
  }

  const appUrl = process.env.APP_URL || 'https://watch.somniread.com';

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: plan.amount,
        currency: 'NGN',
        callback_url: `${appUrl}/payment/success`,
        metadata: {
          planId,
          tier: plan.tier,
          userName: userName || '',
          founders: plan.founders || false,
          custom_fields: [
            { display_name: 'Plan', variable_name: 'plan', value: plan.name },
            { display_name: 'Username', variable_name: 'username', value: userName || '' }
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      authorization_url: response.data.data.authorization_url,
      access_code: response.data.data.access_code,
      reference: response.data.data.reference
    });
  } catch (err) {
    console.error('Paystack init error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

// ── Verify a transaction by reference ───────────────────────────
// GET /api/payment/verify/:reference
router.get('/verify/:reference', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${req.params.reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    const data = response.data.data;
    if (data.status !== 'success') {
      return res.status(400).json({ error: 'Payment not successful', status: data.status });
    }

    res.json({
      status: data.status,
      email: data.customer.email,
      amount: data.amount,
      planId: data.metadata?.planId,
      tier: data.metadata?.tier,
      reference: data.reference
    });
  } catch (err) {
    console.error('Paystack verify error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Verification failed' });
  }
});

// ── Paystack Webhook ─────────────────────────────────────────────
// POST /api/payment/webhook
// Called by Paystack on every event — must return 200 fast
router.post('/webhook', async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = crypto
    .createHmac('sha512', secret)
    .update(req.body)
    .digest('hex');

  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).send('Invalid signature');
  }

  // Acknowledge immediately — Paystack requires fast response
  res.sendStatus(200);

  let event;
  try {
    event = JSON.parse(req.body);
  } catch {
    return;
  }

  const { event: eventType, data } = event;
  console.log(`[Paystack] Event: ${eventType}`);

  if (eventType === 'charge.success') {
    await handlePaymentSuccess(data);
  }

  if (eventType === 'subscription.disable' || eventType === 'subscription.not_renew') {
    await handleSubscriptionCancelled(data);
  }
});

// ── Handle successful payment ────────────────────────────────────
async function handlePaymentSuccess(data) {
  const email = data.customer?.email;
  const meta = data.metadata || {};
  const tier = meta.tier || 'free';
  const planId = meta.planId || '';
  const isFounders = meta.founders || false;
  const reference = data.reference;

  if (!email) return;

  console.log(`[Payment] ✓ ${email} → ${tier} (${planId})`);

  try {
    const admin = require('./firebase-admin');
    const db = admin.firestore();

    // Calculate expiry
    const now = new Date();
    const isYearly = planId.includes('yearly') || planId.includes('founders');
    const expiresAt = new Date(now);
    if (isYearly) {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    // Find or create user by email
    let uid;
    try {
      const userRecord = await admin.auth().getUserByEmail(email);
      uid = userRecord.uid;
    } catch {
      // User doesn't exist yet — create them
      const newUser = await admin.auth().createUser({ email, emailVerified: false });
      uid = newUser.uid;
      console.log(`[Auth] Created user ${uid} for ${email}`);
    }

    // Write plan to Firestore
    await db.collection('users').doc(uid).set({
      email,
      tier,
      planId,
      isFounders,
      reference,
      subscribedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      active: true
    }, { merge: true });

    console.log(`[Firestore] Plan written for ${email}: ${tier} → expires ${expiresAt.toDateString()}`);

    // Send welcome email via Paystack (or log for manual follow-up)
    console.log(`[TODO] Send welcome email to ${email} for ${tier} plan`);

  } catch (err) {
    console.error('[Payment handler error]', err.message);
  }
}

// ── Handle subscription cancellation ────────────────────────────
async function handleSubscriptionCancelled(data) {
  const email = data.customer?.email;
  if (!email) return;

  console.log(`[Subscription] Cancelled for ${email}`);

  try {
    const admin = require('./firebase-admin');
    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.firestore().collection('users').doc(userRecord.uid).update({
      tier: 'free',
      active: false,
      cancelledAt: new Date().toISOString()
    });
    console.log(`[Firestore] ${email} downgraded to free`);
  } catch (err) {
    console.error('[Cancellation handler error]', err.message);
  }
}

// ── Get plans list (for frontend) ───────────────────────────────
// GET /api/payment/plans
router.get('/plans', (req, res) => {
  const publicPlans = Object.entries(PLANS).map(([id, p]) => ({
    id,
    name: p.name,
    amountKobo: p.amount,
    amountNaira: p.amount / 100,
    interval: p.interval,
    tier: p.tier,
    founders: p.founders || false
  }));
  res.json(publicPlans);
});

module.exports = router;
