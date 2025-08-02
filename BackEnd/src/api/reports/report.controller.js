const { admin } = require('../../config/firebase');
const { cloudinary } = require('../../config/cloudinary');

exports.createReport = async (req, res) => {
  try {
    // 1. Get data from the multipart/form-data request body
    const { title, description, category, address, userEmail, hideUser, isHide } = req.body;
    const files = req.files;

    // 2. Basic validation
    if (!title || !description || !category || !address || !userEmail) {
      return res.status(400).send({ message: 'Missing required text fields.' });
    }
    if (!files || files.length === 0) {
      return res.status(400).send({ message: 'At least one photo is required.' });
    }

    // 3. Upload images to Cloudinary
    const uploadPromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({ folder: 'civic_reports' }, (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        });
        uploadStream.end(file.buffer);
      });
    });
    const imageUrls = await Promise.all(uploadPromises);

    // 4. Generate a new document reference to get the ID first
    const reportRef = admin.firestore().collection('reports').doc();
    const reportId = reportRef.id;

    // 5. Prepare the document for Firestore, now including its own ID
    const timestamp = new Date().toISOString();
    const newReport = {
      reportId: reportId, // Storing the document's ID as a field
      title,
      description,
      category,
      address,
      imgURL: imageUrls,
      spam: 0,
      status: 'open',
      userEmail: hideUser === 'true' ? 'user-chose-to-hide-email' : userEmail,
      isHide: isHide === 'true',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // 6. Save the new report data to the generated reference
    await reportRef.set(newReport);
    
    // 7. Send a success response
    return res.status(201).send({
      message: 'Report created successfully!',
      data: newReport,
    });

  } catch (error) {
    console.error('Error creating report:', error);
    return res.status(500).send({ message: `Error creating report: ${error.message}` });
  }
};

exports.getAllReports = async (req, res) => {
    try {
        const reportsRef = admin.firestore().collection('reports');
        const snapshot = await reportsRef.get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const reports = [];

        snapshot.forEach(doc => {
            reports.push({
                report_id: doc.id, 
                ...doc.data()
            });
        });
        
        return res.status(200).json(reports);

    } catch (error) {
        console.error('Error getting reports:', error);
        return res.status(500).send({ message: `Error getting reports: ${error.message}` });
    }
};

exports.updateReport = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { description, category, address, status, isHide, userEmail, hideUser } = req.body;

        const reportRef = admin.firestore().collection('reports').doc(reportId);
        const doc = await reportRef.get();

        if (!doc.exists) {
            return res.status(404).send({ message: 'Report not found.' });
        }

        const updateData = {};
        if (description !== undefined) updateData.description = description;
        if (category !== undefined) updateData.category = category;
        if (address !== undefined) updateData.address = address;
        if (status !== undefined) updateData.status = status;
        if (isHide !== undefined) updateData.isHide = isHide === true;
        if (hideUser !== undefined && userEmail !== undefined) {
             updateData.userEmail = hideUser === true ? 'user-chose-to-hide-email' : userEmail;
        }
        updateData.updatedAt = new Date().toISOString();
        
        await reportRef.update(updateData);

        return res.status(200).send({ 
            message: 'Report updated successfully!',
            reportId: reportId,
            updatedFields: updateData 
        });

    } catch (error) {
        console.error('Error updating report:', error);
        return res.status(500).send({ message: `Error updating report: ${error.message}` });
    }
};