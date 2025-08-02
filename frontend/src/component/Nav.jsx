import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div className="container-fluid bg-light py-3">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left side: Logo */}
          <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
            <h4 className="m-0">
              <Link to="/" className="text-decoration-none text-dark">CivicTrack</Link>
            </h4>
          </div>
          {/* Right side: Links and Buttons */}
          <div className="col-12  col-md-6 d-flex justify-content-center justify-content-md-end flex-wrap gap-2">
            <Link to="/about" className="text-decoration-none text-dark pt-1">About Us</Link>
            <Link to="/info" className="text-decoration-none text-dark pt-1">Info</Link>
            <Link to="/login" className="btn btn-outline-primary bg-dark text-light btn-sm">Register/Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav
