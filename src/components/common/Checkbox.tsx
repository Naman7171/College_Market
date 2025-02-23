import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: string;
  groupLabel?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, groupLabel, className = '', ...props }, ref) => {
    const id = `checkbox-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className={`relative flex items-start ${className}`}>
        {groupLabel && (
          <div className="sr-only" aria-hidden="true">
            {groupLabel}
          </div>
        )}
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            className="w-4 h-4 
              text-primary-600 
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-600 
              rounded 
              focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800
              hover:border-primary-500 dark:hover:border-primary-400
              transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              cursor-pointer"
            aria-describedby={description ? `${id}-description` : undefined}
            {...props}
          />
        </div>
        <div className="ml-3">
          <label
            htmlFor={id}
            className="text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer select-none"
          >
            {label}
          </label>
          {description && (
            <p
              id={`${id}-description`}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              {description}
            </p>
          )}
          {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);