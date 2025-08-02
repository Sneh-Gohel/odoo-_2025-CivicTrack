const admin = require('firebase-admin');
require('dotenv').config(); // Loads environment variables from .env file

// 2. Parse the service account key from the environment variable
// We need to parse the JSON string from the .env file into a JavaScript object
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// 3. Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// 4. Export the initialized admin object
// This allows other files in our project to use the same Firebase connection
// to access Firestore, Authentication, etc.
module.exports = { admin };