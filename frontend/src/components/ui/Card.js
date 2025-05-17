import React from 'react';

const Card = ({ children, className = '', title, actions }) => {
  return (
    <div className={`bg-primary rounded-lg overflow-hidden shadow-card ${className}`}>
      {title && (
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold">{title}</h3>
          {actions && <div className="flex space-x-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
