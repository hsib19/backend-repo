import admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json'); // Replace with your service account key file name

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;