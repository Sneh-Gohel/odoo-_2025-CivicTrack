const express = require('express');
const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Import and use the authentication routes
const authRoutes = require('./api/auth/auth.routes');
app.use('/api/auth', authRoutes); // All auth routes will be prefixed with /api/auth

// Simple route for the root URL to check if the server is running
app.get('/', (req, res) => {
  res.send('Node.js Backend Server is running!');
});

module.exports = app;