import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  fullWidth = false,
  className = '',
  icon,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full px-8 py-3.5 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]";
  
  const variants = {
    // Primary is now the vibrant Green gradient
    primary: "bg-gradient-to-r from-brand-green to-brand-green-dark hover:from-brand-green-light hover:to-brand-green text-white shadow-lg shadow-brand-green/20 border border-transparent",
    // Secondary is the Yellow accent
    secondary: "bg-brand-yellow hover:bg-brand-yellow-light text-brand-purple font-bold shadow-lg shadow-brand-yellow/20 border border-transparent",
    outline: "border-2 border-brand-yellow text-brand-yellow hover:bg-brand-yellow/10",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5",
    white: "bg-white text-brand-purple hover:bg-gray-100 border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};