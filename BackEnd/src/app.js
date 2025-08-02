// File: src/app.js
// Description: Enable CORS to allow requests from your React frontend.

const express = require('express');
const cors = require('cors'); // 1. Import the cors package
const app = express();

// 2. Use the cors middleware
// This will add the necessary headers to allow cross-origin requests.
app.use(cors());

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

const authRoutes = require('./api/auth/auth.routes');
app.use('/api/auth', authRoutes);

const reportRoutes = require('./api/reports/report.routes');
app.use('/api/reports', reportRoutes);

// Simple route for the root URL to check if the server is running
app.get('/', (req, res) => {
  res.send('Node.js Backend Server is running!');
});

module.exports = app;
