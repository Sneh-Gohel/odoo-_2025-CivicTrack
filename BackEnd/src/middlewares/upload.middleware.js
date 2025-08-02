const multer = require('multer');

// Configure multer to store files in memory
const storage = multer.memoryStorage();

// Initialize multer with the storage configuration
// .array('photos', 5) means it will look for files in a field named 'photos'
// and will accept a maximum of 5 files.
const upload = multer({ storage: storage }).array('photos', 5);

module.exports = upload;