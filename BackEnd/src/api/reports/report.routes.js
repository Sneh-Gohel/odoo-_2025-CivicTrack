const express = require('express');
const router = express.Router();
const reportController = require('./report.controller');
const uploadMiddleware = require('../../middlewares/upload.middleware');

// Defines the endpoint: POST /api/reports
// It uses the uploadMiddleware to handle the file uploads first.
router.post('/', uploadMiddleware, reportController.createReport);

module.exports = router;