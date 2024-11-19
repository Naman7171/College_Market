import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3 py-2 bg-white dark:bg-gray-800 border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-primary-500 
            disabled:opacity-50 disabled:cursor-not-allowed
            text-gray-900 dark:text-white
            transition-colors duration-200
            ${error ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);