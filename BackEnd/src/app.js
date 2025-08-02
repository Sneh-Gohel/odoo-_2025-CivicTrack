const express = require('express');
const app = express();

app.use(express.json());


const authRoutes = require('./api/auth/auth.routes');
app.use('/api/auth', authRoutes);


const reportRoutes = require('./api/reports/report.routes');
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('Node.js Backend Server is running!');
});

module.exports = app;