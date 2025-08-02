import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function UserReport() {
  const [status, setStatus] = useState("Pending");
  const [description, setDescription] = useState(
    "Road on AV Road, Anand near local shops is severely damaged, causing inconvenience, traffic issues, and potential safety hazards."
  );
  const [location, setLocation] = useState(
    "209, Sardar Patel Rd, Kelvadi, Vallabh Vidyanagar, Anand, Gujarat 388001"
  );
  const [image, setImage] = useState("https://via.placeholder.com/300x200");
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleUpdate = () => {
    const updatedData = {
      status,
      description,
      location,
      image
    };
    console.log("Updated Report:", updatedData);
    alert("Report updated successfully.");
    setIsEditing(false);
  };

  return (
    <div className="container py-4">
      <Link to="/userdashboard" className="mb-3 d-inline-block text-decoration-none">
        ← Back
      </Link>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="fw-bold mb-3">Report</h4>

        <div className="row">
          {/* Left Section */}
          <div className="col-md-8">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted small">2 AUGUST 2025</span>
              <div className="d-flex gap-3">
                {!isEditing ? (
                  <span className="text-primary" role="button" onClick={() => setIsEditing(true)}>
                    Edit ✎
                  </span>
                ) : (
                  <span className="text-success" role="button" onClick={handleUpdate}>
                    Save ✅
                  </span>
                )}
              </div>
            </div>

            {/* Editable Image */}
            <div className="mb-3">
              <img
                src={image}
                alt="Report"
                className="rounded"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              {isEditing && (
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-4">
              <strong>Description:</strong><br />
              {isEditing ? (
                <textarea
                  className="form-control mt-2"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              ) : (
                <p>{description}</p>
              )}
            </div>

            {/* Activity Tracker */}
            
          </div>

          {/* Right Section: Location */}
          <div className="col-md-4 mt-4 mt-md-0">
            <h6 className="fw-bold">Location</h6>
            <img
              src="https://via.placeholder.com/300x200?text=Map+Location"
              alt="Map"
              className="rounded mb-2 w-100"
            />
            {isEditing ? (
              <textarea
                className="form-control"
                rows="2"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            ) : (
              <>
                <p className="mb-1 small">📍 {location}</p>
                <p className="small text-muted">Reported by: <strong>Mike taisooonn</strong></p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserReport;
