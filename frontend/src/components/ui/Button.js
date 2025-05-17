import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  href,
  disabled = false,
  type = 'button',
  onClick,
  ...props
}) => {
  // Determine base class
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Determine variant classes
  const variantClasses = {
    primary: 'bg-secondary text-background hover:bg-secondary/90',
    outline: 'border border-secondary text-secondary hover:bg-secondary/10',
    ghost: 'text-foreground hover:bg-gray-800',
  };
  
  // Determine size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded',
    md: 'px-4 py-2 rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };
  
  // Combine classes
  const classes = `${baseClasses} ${variantClasses[variant] || ''} ${sizeClasses[size] || ''} ${className}`;
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link to={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  
  // Render as button
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
