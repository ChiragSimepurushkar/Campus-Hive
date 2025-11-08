import React from 'react';

const Card = ({ children, className = '', hover = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white rounded-xl shadow-md p-6 ${hover ? 'hover:shadow-xl transition-shadow duration-300 cursor-pointer' : ''} ${className}`}
  >
    {children}
  </div>
);

export default Card;