import React from 'react';
import HeroImage from '../assets/images/HeroImage.png'

function Hero() {
  return (
    <div className="container-fluid py-3  bg-light position-relative overflow-hidden">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          
          {/* Left Text Section */}
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <h2 className="fw-bold">Report Civic Issues. Track Progress.</h2>
            <h4 className="text-primary mb-4">Join For Change</h4>
            <button className="btn btn-primary px-4 py-2">Share Your Voice</button>
          </div>
          
          {/* Right Image Section */}
          <div className="col-12 col-md-6">
            <img
                src={HeroImage}
              alt="Hero"
              className="img-fluid"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
          
        </div>
      </div>

      {/* Optional background wave strip */}
      <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '20px', backgroundColor: '#caa9f2' }}></div>
    </div>
  );
}

export default Hero;
