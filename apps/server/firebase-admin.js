// Firebase Admin SDK — singleton init
const admin = require('firebase-admin');

if (!admin.apps.length) {
  let cred;
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    cred = admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT));
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    cred = admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    });
  }
  if (cred) admin.initializeApp({ credential: cred });
}

module.exports = admin;
