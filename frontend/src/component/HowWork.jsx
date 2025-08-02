import React from 'react';
import step1 from '../assets/images/step1.png';
import step2 from '../assets/images/step2.png';
import step3 from '../assets/images/step3.png';

function HowWork() {
  return (
    <div className="container py-5 text-center">
      <h5 className="fw-bold text-dark">How It Works</h5>
      <h3 className="text-primary mb-5">Just 3 Steps</h3>

      {/* Step 1 */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 text-md-center text-center">
          <div className="bg-primary text-white px-3 py-2 rounded-pill d-inline-block small">step 1</div>
          <p className="mt-2">Snap a photo or describe the issue</p>
        </div>
        <div className="col-md-6 text-center">
          <img src={step1} alt="Step 1" className="img-fluid" style={{ maxHeight: '150px' }} />
        </div>
      </div>

      {/* Step 2 */}
      <div className="row align-items-center flex-md-row-reverse mb-5">
        <div className="col-md-6 text-md-center text-center">
          <div className="bg-primary text-white px-3 py-2 rounded-pill d-inline-block small">step 2</div>
          <p className="mt-2">Choose category (e.g., Road, Garbage, Water, etc.)</p>
        </div>
        <div className="col-md-6 text-center">
          <img src={step2} alt="Step 2" className="img-fluid" style={{ maxHeight: '150px' }} />
        </div>
      </div>

      {/* Step 3 */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 text-md-center text-center bg-primary rounded">
          <div className="bg-primary text-white px-3 py-2 rounded-pill d-inline-block small">step 3</div>
          <p className="mt-2">Share info. with photos...</p>
        </div>
        <div className="col-md-6 text-center">
          <img src={step3} alt="Step 3" className="img-fluid" style={{ maxHeight: '150px' }} />
        </div>
      </div>
    </div>
  );
}

export default HowWork;
