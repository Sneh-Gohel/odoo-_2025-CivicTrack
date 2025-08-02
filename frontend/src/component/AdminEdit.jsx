import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function AdminEdit() {
  const { id } = useParams();

  const [report, setReport] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    status: '',
    image: '',
  });

  useEffect(() => {
    // Mock fetch based on ID — replace with real API later
    const fakeData = {
      1: {
        title: 'Pothole in Road',
        category: 'Road',
        description: 'Large pothole near Anand Bus Stand, Main Road. Urgent repair needed.',
        location: 'Anand',
        status: 'In Progress',
        image: 'https://via.placeholder.com/250x150?text=Pothole',
      },
      2: {
        title: 'Street Light',
        category: 'Street Light Not Working',
        description: 'Street light not working at main street, VV Nagar.',
        location: 'V V Nagar',
        status: 'In Progress',
        image: 'https://via.placeholder.com/250x150?text=Street+Light',
      }
    };

    setReport(fakeData[id]);
  }, [id]);

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Updated Report:", report);
    alert("Report updated successfully!");
  };

  return (
    <div className="container py-4">
      <Link to="/admindashboard" className="d-inline-block mb-3 text-decoration-none">← Back</Link>
      <h4 className="fw-bold mb-4">Edit Report #{id}</h4>

      <div className="row">
        <div className="col-md-8">
          <img src={report.image} alt={report.title} className="rounded mb-3 w-100" />
          <div className="mb-3">
            <label className="form-label fw-bold">Title</label>
            <input name="title" value={report.title} className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Category</label>
            <input name="category" value={report.category} className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea name="description" value={report.description} className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Location</label>
            <input name="location" value={report.location} className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Status</label>
            <select name="status" value={report.status} className="form-select" onChange={handleChange}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default AdminEdit;
