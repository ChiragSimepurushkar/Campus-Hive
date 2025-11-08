// /client/src/components/UI/Input.jsx

import React from 'react';

function Input({ label, type = 'text', id, value, onChange, className = '', required = false, ...props }) {
  // Use a generated ID if none is provided
  const inputId = id || `input-${label.toLowerCase().replace(/\s/g, '-')}`;

  return (
    <div className="mb-3">
      <label htmlFor={inputId} className="form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <input
        type={type}
        className={`form-control ${className}`}
        id={inputId}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  );
}

export default Input;