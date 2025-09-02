import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
  onClick?: () => void;
  animate?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick,
  animate = true
}) => {
  const baseClasses = 'rounded-2xl p-4 transition-all duration-200 touch-manipulation';
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm active:shadow-md',
    glass: 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-white/20 shadow-md',
    gradient: 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg'
  };

  const MotionDiv = animate ? motion.div : 'div';

  return (
    <MotionDiv
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}`}
      onClick={onClick}
      {...(animate && {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
        whileTap: onClick ? { scale: 0.98 } : undefined,
      })}
    >
      {children}
    </MotionDiv>
  );
};