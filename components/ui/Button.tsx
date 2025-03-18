import React, { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  isLoading?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  isLoading = false,
  className = '',
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Base classes for all button variants
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border border-transparent',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border border-transparent dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-600 hover:text-blue-700 dark:hover:bg-gray-800',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent dark:hover:bg-gray-800 dark:text-gray-300',
  };
  
  // Disabled classes
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  // Loading classes and content
  const loadingContent = isLoading ? (
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  ) : null;
  
  // Combined classes
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`;
  
  // Render as link if href is provided
  if (href) {
    const linkProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    
    return (
      <Link 
        href={href} 
        className={combinedClasses}
        {...linkProps}
        onClick={props.onClick as any}
      >
        {loadingContent}
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Link>
    );
  }
  
  // Render as button
  return (
    <button 
      className={combinedClasses} 
      type={props.type || 'button'}
      {...props}
    >
      {loadingContent}
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
