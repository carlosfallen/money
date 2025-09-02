import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface MetricCardProps {
  title: string;
  value: string;
  trend?: number;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
  onClick?: () => void;
  delay?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  icon: Icon,
  color,
  subtitle,
  onClick,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      <Card
        onClick={onClick}
        className={`relative overflow-hidden ${onClick ? 'hover:shadow-lg' : ''}`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {title}
              </p>

              <motion.div
                className="rounded-md flex-shrink-0 p-1 w-8 h-8 flex items-center justify-center"
                style={{ backgroundColor: `${color}20` }}
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.35, delay: delay + 0.05 }}
              >
                <Icon className="w-4 h-4" style={{ color }} />
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.2 }}
            >
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                <span className="whitespace-nowrap">{value}</span>
              </p>
            </motion.div>

            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}

            {trend !== undefined && (
              <motion.div
                className="flex items-center mt-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: delay + 0.3 }}
              >
                <div
                  className={`text-xs font-medium ${
                    trend > 0 ? 'text-success-600' : trend < 0 ? 'text-error-600' : 'text-gray-500'
                  }`}
                >
                  {trend > 0 ? '+' : ''}
                  {trend}%
                </div>
                <span className="text-xs text-gray-500 ml-1">vs último mês</span>
              </motion.div>
            )}
          </div>

          {/* removed right-side icon so it sits next to title only */}
        </div>

        <motion.div
          className="absolute inset-0 opacity-5 rounded-2xl pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${color}40 0%, transparent 70%)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 0.5, delay: delay + 0.4 }}
        />
      </Card>
    </motion.div>
  );
};
