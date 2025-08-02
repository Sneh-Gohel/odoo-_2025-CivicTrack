import React from 'react';
import { useNavigate } from 'react-router-dom';

const reports = [
  {
    id: 1,
    image: 'https://via.placeholder.com/250x150?text=Pothole',
    category: 'Road',
    title: 'Pothole in Road',
    description: 'Large pothole near Anand Bus Stand, Main Road. Urgent repair needed.',
    location: 'Anand',
    distance: '2.1 Km',
    status: 'In Progress',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/250x150?text=Street+Light',
    category: 'Street Light Not Working',
    title: 'Street Light',
    description: 'Large pothole near Anand Bus Stand, Main Road. Urgent repair needed.',
    location: 'V V Nagar',
    distance: '1 Km',
    status: 'In Progress',
  }
];

function AdminDashboard() {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/adminedit/${id}`);
  };

  return (
    <div className="container py-4">
      <h4 className="fw-bold mb-3">Admin dashboard</h4>

      {/* Filters */}
      <div className="d-flex gap-2 mb-4">
        <select className="form-select w-auto">
          <option>Categories</option>
        </select>
        <select className="form-select w-auto">
          <option>Status</option>
        </select>
        <select className="form-select w-auto">
          <option>Distance</option>
        </select>
        <input className="form-control w-25 ms-auto" placeholder="Search Reports" />
      </div>

      <h5 className="mb-3">See Reports</h5>

      <div className="row">
        {reports.map(report => (
          <div key={report.id} className="col-md-3 mb-4">
            <div className="card shadow-sm" onClick={() => handleCardClick(report.id)} style={{ cursor: 'pointer' }}>
              <img src={report.image} alt={report.title} className="card-img-top" />
              <div className="card-body">
                <p className="text-danger small mb-1">{report.category}</p>
                <h6 className="card-title">{report.title}</h6>
                <p className="small text-muted mb-1">📍 {report.location}</p>
                <p className="small">{report.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-warning text-dark">{report.status}</span>
                  <span className="small">{report.distance}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-sm btn-outline-dark">&lt;</button>
        <span className="mx-2">0</span>
        <button className="btn btn-sm btn-outline-dark">&gt;</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
