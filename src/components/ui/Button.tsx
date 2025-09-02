import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  onClick,
  disabled = false,
  className = '',
  fullWidth = false
}) => {
  const baseClasses = 'font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2 touch-manipulation select-none';
  
  const variantClasses = {
    primary: 'bg-primary-500 active:bg-primary-600 text-white shadow-lg active:shadow-sm',
    secondary: 'bg-secondary-500 active:bg-secondary-600 text-white shadow-lg active:shadow-sm',
    outline: 'border-2 border-primary-500 text-primary-500 active:bg-primary-50 dark:active:bg-primary-900/20 bg-white dark:bg-gray-800',
    ghost: 'text-gray-600 active:bg-gray-100 dark:text-gray-400 dark:active:bg-gray-700'
  };

  const sizeClasses = {
    sm: Icon && !children ? 'p-2 min-h-[32px] min-w-[32px]' : 'px-3 py-2 text-sm min-h-[32px]',
    md: Icon && !children ? 'p-2.5 min-h-[44px] min-w-[44px]' : 'px-4 py-3 text-sm min-h-[44px]',
    lg: Icon && !children ? 'p-3 min-h-[52px] min-w-[52px]' : 'px-6 py-4 text-base min-h-[52px]'
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 20
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
    >
      {Icon && iconPosition === 'left' && <Icon size={iconSizes[size]} className="flex-shrink-0" />}
      {children && <span className="truncate">{children}</span>}
      {Icon && iconPosition === 'right' && <Icon size={iconSizes[size]} className="flex-shrink-0" />}
    </motion.button>
  );
};