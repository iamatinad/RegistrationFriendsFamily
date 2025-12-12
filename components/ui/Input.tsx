import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...props }) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className={`
            w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
            placeholder-gray-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 
            transition-colors duration-200 outline-none
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, error, options, className = '', id, ...props }) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={`
            w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white 
            focus:border-brand-500 focus:ring-1 focus:ring-brand-500 
            transition-colors duration-200 outline-none appearance-none
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
          `}
          {...props}
        >
          <option value="" disabled className="bg-gray-900 text-gray-500">Select an option</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
    </div>
  );
};
