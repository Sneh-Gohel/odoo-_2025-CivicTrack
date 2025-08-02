const express = require('express');
const router = express.Router();
const reportController = require('./report.controller');
const uploadMiddleware = require('../../middlewares/upload.middleware');

// Create a new report
// This route will handle the creation of a new report with uploaded photos
// The endpoint is POST /api/reports/
router.post('/', uploadMiddleware, reportController.createReport);

// Get all reports
// This route will be used to fetch all reports
router.get('/', reportController.getAllReports);

// Get a specific report by ID
router.put('/:reportId', reportController.updateReport);


module.exports = router;