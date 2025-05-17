import React from 'react';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium mb-2">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-background text-foreground border ${
          error ? 'border-danger' : 'border-gray-800'
        } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50`}
        {...props}
      />
      {error && <p className="mt-1 text-danger text-sm">{error}</p>}
    </div>
  );
};

export default Input;
