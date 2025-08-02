import React, { useState } from 'react';
import registerImg from '../assets/images/register.png';
import { Link } from 'react-router-dom';
import axios from 'axios'; // You can also use fetch if you prefer

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/register', formData); // Replace with your backend URL
      alert('User registered successfully!');
      console.log(res.data);
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <h3 className="text-center fw-bold mb-4">
        "Join the change. Be the voice your community needs"
      </h3>

      <div className="row align-items-center justify-content-center">
        {/* Image */}
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img src={registerImg} alt="Join Community" className="img-fluid" style={{ maxWidth: '400px' }} />
        </div>

        {/* Form */}
        <div className="col-12 col-md-6">
          <div className="bg-white shadow p-4 rounded" style={{ maxWidth: '400px', margin: 'auto' }}>
            <h5 className="text-center mb-3">Register</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">User Name:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="+91 Enter your number"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <p className="text-center small">
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <button type="submit" className="btn btn-dark w-100">Register</button>
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

export default Register;
