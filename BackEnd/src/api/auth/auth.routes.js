const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

// Existing signup route
router.post('/signup', authController.signup);

// --- NEW ---
// Add the login route
// Defines the endpoint: POST /api/auth/login
router.post('/login', authController.login);
// --- END NEW ---

module.exports = router;