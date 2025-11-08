// /client/src/components/UI/LoadingSpinner.jsx

import React from 'react';

function LoadingSpinner({ text = 'Loading...', size = 'sm' }) {
  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className={`spinner-border text-primary me-2 spinner-border-${size}`} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      <p className="m-0 text-muted">{text}</p>
    </div>
  );
}

export default LoadingSpinner;