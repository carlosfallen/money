import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Moon, Sun, User, Menu } from 'lucide-react'
import { useFinancialStore } from '../../store/useFinancialStore'
import { Button } from '../ui/Button'
import { navItems } from './NavigationBar'

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode, activeView, setActiveView } = useFinancialStore()

  const currentTitle = navItems.find(item => item.id === activeView)?.label || 'Finanças CLT'
  const settingsItem = navItems.find(item => item.id === 'settings')

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 max-w-7xl mx-auto">
        <motion.div
          className="flex items-center gap-4"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <motion.button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </motion.button>
          
          <div>
            <motion.h1 
              className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white font-display"
              layoutId="page-title"
            >
              {currentTitle}
            </motion.h1>
            <motion.p 
              className="text-sm text-gray-500 dark:text-gray-400 mt-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {new Date().toLocaleDateString('pt-BR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-center gap-1"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            initial={{ scale: 0, rotate: -180 }} 
            animate={{ scale: 1, rotate: 0 }} 
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Button 
              variant="ghost" 
              size="sm" 
              icon={Bell} 
              className="relative hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/20" 
              onClick={() => {}}
            >
              <motion.div
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-error-500 rounded-full border-2 border-white dark:border-gray-900"
                animate={{ 
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(239, 68, 68, 0.7)",
                    "0 0 0 4px rgba(239, 68, 68, 0)",
                    "0 0 0 0 rgba(239, 68, 68, 0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </motion.div>

          <motion.div 
            initial={{ scale: 0, rotate: -180 }} 
            animate={{ scale: 1, rotate: 0 }} 
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <Button
              variant="ghost"
              size="sm"
              icon={darkMode ? Sun : Moon}
              onClick={toggleDarkMode}
              className="hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/20"
            />
          </motion.div>

          {settingsItem && (
            <motion.div 
              initial={{ scale: 0, rotate: -180 }} 
              animate={{ scale: 1, rotate: 0 }} 
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              <Button
                variant="ghost"
                size="sm"
                icon={User}
                onClick={() => setActiveView(settingsItem.id)}
                className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.header>
  )
}