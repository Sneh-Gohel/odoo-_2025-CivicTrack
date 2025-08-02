// src/component/Login.jsx
import React from 'react';
import loginImg from '../assets/images/login.png'; // Make sure this path is correct
import { Link } from 'react-router-dom';

function Login() {
  return (      
    <div className="container py-5">
      <h3 className="text-center fw-bold mb-4">
        "Welcome back—your next report could make a difference"
      </h3>

      <div className="row align-items-center justify-content-center">
        {/* Left Image */}
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img src={loginImg} alt="Login Visual" className="img-fluid" style={{ maxWidth: '400px' }} />
        </div>

        {/* Login Form */}
        <div className="col-12 col-md-6">
          <div className="bg-white shadow p-4 rounded" style={{ maxWidth: '400px', margin: 'auto' }}>
            <h5 className="text-center mb-3">Login</h5>
            <form>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" className="form-control" placeholder="Enter your name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input type="password" className="form-control" placeholder="Enter your password" />
              </div>
              <p className="text-center small">
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
              <button type="submit" className="btn btn-dark w-100">Login</button>
            </form>
          </div>
        </div>
      </div>

      <p className="text-center mt-5 fw-bold">
        <span style={{ color: "#a259ff" }}>Odoo</span> Hakathon 2025
      </p>
    </div>
  );
}

export default Login;
