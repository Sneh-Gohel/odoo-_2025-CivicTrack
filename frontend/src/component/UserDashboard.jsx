import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function UserDashboard() {
  const [manualLocation, setManualLocation] = useState(false);
  const [category, setCategory] = useState('');
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Sample form data — adjust according to your form
  const formData = {
    location,
    category,
    description,
    isAnonymous,
    image: selectedFile, // file upload
  };

  // Use FormData if you're uploading files
  const data = new FormData();
  data.append('location', location);
  data.append('category', category);
  data.append('description', description);
  data.append('isAnonymous', isAnonymous);
  data.append('image', selectedFile); // must be a File object

  try {
    const response = await axios.post('http://localhost:5000/api/report', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Report submitted:', response.data);
    alert("Report submitted successfully!");
    // Reset form if needed
  } catch (error) {
    console.error('Error submitting report:', error.response?.data || error.message);
    alert("Failed to submit report.");
  }
};

  return (
    <div className="container py-5">
        <p>
        <Link to='/UserReport'>Old Reports</Link>
        </p>
      <h4 className="text-center fw-bold mb-4">Submit Report</h4>

      <form
        className="mx-auto p-4 rounded shadow"
        onSubmit={handleSubmit}
        style={{ maxWidth: '500px', backgroundColor: '#fff' }}
      >
        <div className="mb-3 text-center">
          <label className="form-label fw-bold">Upload Photos</label>
          <div className="border rounded p-4" style={{ cursor: 'pointer' }}>
            + upload images
            <input
              type="file"
              className="form-control mt-2"
            />
          </div>    
        </div> 

        <div className="mb-3">
          <label className="form-label fw-bold d-flex justify-content-between">
            Enter Location:
            <span>
              <small>Enter Location Manual</small>
              <input
                type="checkbox"
                className="form-check-input ms-2"
                onChange={() => setManualLocation(!manualLocation)}
              />
            </span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter location"
            disabled={!manualLocation}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Choose Categories:</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Select Category</option>
            <option>Road</option>
            <option>Garbage</option>
            <option>Water</option>
            <option>Electricity</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Description:</label>
          <textarea
            className="form-control"
            placeholder="Describe the issue"
            rows="3"
          ></textarea>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          <label className="form-check-label ms-2">
            Report Anonymous
          </label>
        </div>

        <button className="btn w-100 text-white" style={{ backgroundColor: '#845EF7' }}>
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default UserDashboard;
