const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();

router.use((req, res, next) => {
  if (req.path === '/webhook') return next();
  express.json()(req, res, next);
});

const PLANS = {
  solo_monthly:     { name: 'Solo Monthly',     amount: 250000,   interval: 'monthly',  tier: 'solo' },
  solo_yearly:      { name: 'Solo Yearly',      amount: 2400000,  interval: 'annually', tier: 'solo' },
  couples_monthly:  { name: 'Couples Monthly',  amount: 400000,   interval: 'monthly',  tier: 'couples' },
  couples_yearly:   { name: 'Couples Yearly',   amount: 3800000,  interval: 'annually', tier: 'couples' },
  couples_founders: { name: 'Couples Founders', amount: 2800000,  interval: 'annually', tier: 'couples', founders: true },
  team_monthly:     { name: 'Team Monthly',     amount: 950000,   interval: 'monthly',  tier: 'team' },
  team_yearly:      { name: 'Team Yearly',      amount: 9000000,  interval: 'annually', tier: 'team' },
};

router.post('/initialize', async (req, res) => {
  const { email, planId, userName } = req.body;
  if (!email || !planId) return res.status(400).json({ error: 'email and planId are required' });
  const plan = PLANS[planId];
  if (!plan) return res.status(400).json({ error: 'Invalid plan ID' });
  const appUrl = process.env.APP_URL || 'https://watch.somniread.com';
  try {
    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      email, amount: plan.amount, currency: 'NGN',
      callback_url: `${appUrl}/payment/success`,
      metadata: { planId, tier: plan.tier, userName: userName || '', founders: plan.founders || false,
        custom_fields: [{ display_name: 'Plan', variable_name: 'plan', value: plan.name }, { display_name: 'Username', variable_name: 'username', value: userName || '' }]
      }
    }, { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' } });
    res.json({ authorization_url: response.data.data.authorization_url, access_code: response.data.data.access_code, reference: response.data.data.reference });
  } catch (err) {
    console.error('Paystack init error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

router.get('/verify/:reference', async (req, res) => {
  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${req.params.reference}`, { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } });
    const data = response.data.data;
    if (data.status !== 'success') return res.status(400).json({ error: 'Payment not successful', status: data.status });
    res.json({ status: data.status, email: data.customer.email, amount: data.amount, planId: data.metadata?.planId, tier: data.metadata?.tier, reference: data.reference });
  } catch (err) {
    console.error('Paystack verify error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Verification failed' });
  }
});

router.post('/webhook', async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = crypto.createHmac('sha512', secret).update(req.body).digest('hex');
  if (hash !== req.headers['x-paystack-signature']) return res.status(401).send('Invalid signature');
  res.sendStatus(200);
  let event;
  try { event = JSON.parse(req.body); } catch { return; }
  const { event: eventType, data } = event;
  console.log(`[Paystack] Event: ${eventType}`);
  if (eventType === 'charge.success') await handlePaymentSuccess(data);
  if (eventType === 'subscription.disable' || eventType === 'subscription.not_renew') await handleSubscriptionCancelled(data);
});

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
    const adminSdk = require('./firebase-admin');
    const db = adminSdk.firestore();
    const now = new Date();
    const isYearly = planId.includes('yearly') || planId.includes('founders');
    const expiresAt = new Date(now);
    if (isYearly) expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    else expiresAt.setMonth(expiresAt.getMonth() + 1);
    let uid;
    try { const u = await adminSdk.auth().getUserByEmail(email); uid = u.uid; }
    catch { const n = await adminSdk.auth().createUser({ email, emailVerified: false }); uid = n.uid; console.log(`[Auth] Created user ${uid} for ${email}`); }
    await db.collection('users').doc(uid).set({ email, tier, planId, isFounders, reference, subscribedAt: now.toISOString(), expiresAt: expiresAt.toISOString(), active: true }, { merge: true });
    console.log(`[Firestore] Plan written for ${email}: ${tier} → expires ${expiresAt.toDateString()}`);
  } catch (err) { console.error('[Payment handler error]', err.message); }
}

async function handleSubscriptionCancelled(data) {
  const email = data.customer?.email;
  if (!email) return;
  console.log(`[Subscription] Cancelled for ${email}`);
  try {
    const adminSdk = require('./firebase-admin');
    const u = await adminSdk.auth().getUserByEmail(email);
    await adminSdk.firestore().collection('users').doc(u.uid).update({ tier: 'free', active: false, cancelledAt: new Date().toISOString() });
    console.log(`[Firestore] ${email} downgraded to free`);
  } catch (err) { console.error('[Cancellation handler error]', err.message); }
}

router.get('/plans', (req, res) => {
  res.json(Object.entries(PLANS).map(([id, p]) => ({ id, name: p.name, amountKobo: p.amount, amountNaira: p.amount / 100, interval: p.interval, tier: p.tier, founders: p.founders || false })));
});

module.exports = router;
