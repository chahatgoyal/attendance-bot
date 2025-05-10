const admin = require("firebase-admin");

if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function getTrainees() {
  const snapshot = await db.collection("trainees").get();

  const trainees = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.name && data.phone) {
      trainees.push({
        name: data.name,
        phone: data.phone
      });
    }
  });

  return trainees;
}

module.exports = { getTrainees };
