// src/component/Register.jsx
import React from 'react';
import registerImg from '../assets/images/register.png'; // Make sure this matches your image path
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="container py-5">
      <h3 className="text-center fw-bold mb-4">
        "Join the change. Be the voice your community needs"
      </h3>

      <div className="row align-items-center justify-content-center">
        {/* Left Image Section */}
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img src={registerImg} alt="Join Community" className="img-fluid" style={{ maxWidth: '400px' }} />
        </div>

        {/* Register Form Section */}
        <div className="col-12 col-md-6">
          <div className="bg-white shadow p-4 rounded" style={{ maxWidth: '400px', margin: 'auto' }}>
            <h5 className="text-center mb-3">Register</h5>
            <form>
              <div className="mb-3">
                <label className="form-label">User Name:</label>
                <input type="text" className="form-control" placeholder="Enter your name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number:</label>
                <input type="text" className="form-control" placeholder="+91 Enter your number" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" className="form-control" placeholder="Enter your password" />
              </div>
              <p className="text-center small">
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <button type="submit" className="btn btn-dark w-100">Register</button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer text */}
      <p className="text-center mt-5 fw-bold">
        <span style={{ color: "#a259ff" }}>Odoo</span> Hakathon 2025
      </p>
    </div>
  );
}

export default Register;
