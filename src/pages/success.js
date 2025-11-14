import React from 'react';
import './styles.css'
function SuccessPage({ onReset }) {
  return (
    <div className="success-container">
      <h2>Thank You!</h2>
      <p>Your submission has been received successfully.</p>
      <button onClick={onReset} className="submit-btn">
        Submit Another Response
      </button>
    </div>
  );
}

export default SuccessPage;