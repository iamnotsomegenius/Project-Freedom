import React from 'react';

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-background text-foreground border ${
          error ? 'border-danger' : 'border-gray-800'
        } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-danger text-sm">{error}</p>}
    </div>
  );
};

export default Select;
