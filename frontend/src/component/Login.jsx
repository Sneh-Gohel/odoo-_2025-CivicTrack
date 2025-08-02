// src/component/Login.jsx
import React, { useState } from 'react';
import loginImg from '../assets/images/login.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      // Store login status in localStorage (auth can be a token too)
      localStorage.setItem('auth', 'true');

      // Redirect to dashboard
      navigate('/UserReport');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container py-5">
      <h3 className="text-center fw-bold mb-4">
        "Welcome back—your next report could make a difference"
      </h3>

      <div className="row align-items-center justify-content-center">
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img src={loginImg} alt="Login" className="img-fluid" style={{ maxWidth: '400px' }} />
        </div>

        <div className="col-12 col-md-6">
          <div className="bg-white shadow p-4 rounded" style={{ maxWidth: '400px', margin: 'auto' }}>
            <h5 className="text-center mb-3">Login</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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