const { admin } = require('../../config/firebase');
const { cloudinary } = require('../../config/cloudinary');

exports.createReport = async (req, res) => {
  try {
    // 1. Get text data from the request body
    const { title, description, category } = req.body;

    // 2. Get uploaded files from the request (processed by multer)
    const files = req.files;

    // 3. Basic validation
    if (!title || !description || !category) {
      return res.status(400).send({ message: 'Title, description, and category are required.' });
    }
    if (!files || files.length === 0) {
      return res.status(400).send({ message: 'At least one photo is required.' });
    }

    // 4. Upload images to Cloudinary
    console.log('Uploading files to Cloudinary...');
    const uploadPromises = files.map(file => {
      return new Promise((resolve, reject) => {
        // Use a stream to upload the file from memory
        const uploadStream = cloudinary.uploader.upload_stream(
          { 
            folder: 'civic_reports', 
            resource_type: 'image' 
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url); // Resolve with the secure URL of the image
          }
        );
        uploadStream.end(file.buffer);
      });
    });

    // Wait for all uploads to complete
    const imageUrls = await Promise.all(uploadPromises);
    console.log('Files uploaded successfully. URLs:', imageUrls);

    // 5. Prepare the document to be saved in Firestore
    const newReport = {
      title,
      description,
      category,
      imageUrls, // Array of Cloudinary URLs
      spam: 0,
      status: 'open',
      createdAt: new Date().toISOString(),

    };

    // 6. Save the new report to Firestore
    const reportRef = await admin.firestore().collection('reports').add(newReport);
    console.log('Report saved to Firestore with ID:', reportRef.id);

    // 7. Send a success response
    return res.status(201).send({
      message: 'Report created successfully!',
      reportId: reportRef.id,
      data: newReport,
    });

  } catch (error) {
    console.error('Error creating report:', error);
    return res.status(500).send({ message: `Error creating report: ${error.message}` });
  }
};