const { admin } = require('../../config/firebase');
const axios = require('axios'); // Import axios

// The existing signup function should remain here...
exports.signup = async (req, res) => {
  // ... your existing signup code
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send({ message: 'Error: Missing email, password, or name.' });
    }
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name,
    });
    const userDoc = {
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
    };
    await admin.firestore().collection('users').doc(userRecord.uid).set(userDoc);
    return res.status(201).send({ 
        message: 'User created successfully!', 
        uid: userRecord.uid 
    });
  } catch (error) {
    return res.status(500).send({ message: `Error creating user: ${error.message}` });
  }
};


// --- NEW ---
// Add the login function
exports.login = async (req, res) => {
  try {
    // 1. Get email and password from the request body
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'Email and password are required.' });
    }

    // 2. Construct the URL for Firebase's REST API for email/password sign-in
    const apiKey = process.env.FIREBASE_WEB_API_KEY;
    const firebaseAuthUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    // 3. Make a POST request to Firebase to verify the user's credentials
    const response = await axios.post(firebaseAuthUrl, {
      email: email,
      password: password,
      returnSecureToken: true, // This tells Firebase to return an ID token
    });

    // 4. If successful, Firebase returns data including the ID token
    const { idToken, localId } = response.data;

    // 5. Send the ID token and user ID (uid) back to the client
    return res.status(200).send({
      message: 'Login successful!',
      uid: localId,
      token: idToken,
    });

  } catch (error) {
    // 6. If Firebase returns an error (e.g., wrong password), forward it
    const errorMessage = error.response?.data?.error?.message || 'Invalid credentials.';
    console.error('Login Error:', errorMessage);
    return res.status(401).send({ message: errorMessage });
  }
};