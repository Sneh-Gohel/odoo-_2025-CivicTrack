const { admin } = require('../../config/firebase');
const axios = require('axios');

// --- SIGNUP FUNCTION ---
exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send({ message: 'Error: Missing email, password, or name.' });
    }

    // 1. Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });

    // 2. Prepare the user document according to the new schema
    const userDoc = {
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
      is_ban: false, // Default value
    };

    // 3. Save the user document in Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set(userDoc);
    console.log('Successfully saved user data to Firestore with new schema.');

    // 4. Send a success response
    return res.status(201).send({
      message: 'User created successfully!',
      uid: userRecord.uid,
      userData: userDoc
    });

  } catch (error) {
    return res.status(500).send({ message: `Error creating user: ${error.message}` });
  }
};


// --- LOGIN FUNCTION ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'Email and password are required.' });
    }

    const apiKey = process.env.FIREBASE_WEB_API_KEY;
    const firebaseAuthUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    // 1. Authenticate with Firebase Auth
    const response = await axios.post(firebaseAuthUrl, {
      email: email,
      password: password,
      returnSecureToken: true,
    });

    const { idToken, localId } = response.data; // localId is the uid

    // 2. Fetch the user's profile from Firestore
    const userDocRef = await admin.firestore().collection('users').doc(localId).get();

    if (!userDocRef.exists) {
      // This case can happen if a user exists in Auth but not in the database.
      return res.status(404).send({ message: 'User profile not found in database.' });
    }

    // 3. Send the token and the full user profile back to the client
    return res.status(200).send({
      message: 'Login successful!',
      token: idToken,
      user: {
        uid: localId,
        ...userDocRef.data() // This will include name, email, createdAt, is_ban
      },
    });

  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || 'Invalid credentials.';
    console.error('Login Error:', errorMessage);
    return res.status(401).send({ message: errorMessage });
  }
};