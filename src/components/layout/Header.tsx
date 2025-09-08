import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Moon, Sun, User, Menu, X } from 'lucide-react'
import { useFinancialStore } from '../../store/useFinancialStore'
import { Button } from '../ui/Button'
import { navItems } from './NavigationBar'

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode, activeView, setActiveView } = useFinancialStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentTitle = navItems.find(item => item.id === activeView)?.label || 'Finanças CLT'

  const mobileMenuItems = navItems.filter(item =>
    ['settings', 'analytics', 'calendar'].includes(item.id)
  )

  return (
<motion.header
  className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm"
  initial={{ y: -64, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
>
  <div className="flex items-center justify-between px-4 lg:px-6 py-3 max-w-7xl mx-auto">
    
    {/* Esquerda */}
    <div className="flex items-center gap-4">
      {/* Mobile menu button */}
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setMobileMenuOpen(prev => !prev)}
      >
        {mobileMenuOpen ? (
          <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      <div>
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white font-display">
          {currentTitle}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>
    </div>

    {/* Direita */}
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        icon={Bell}
        className="hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/20"
      />
      <Button
        variant="ghost"
        size="sm"
        icon={darkMode ? Sun : Moon}
        onClick={toggleDarkMode}
        className="hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/20"
      />
      <Button
        variant="ghost"
        size="sm"
        icon={User}
        onClick={() => setActiveView('profile')}
        className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
      />

      <div className="hidden lg:flex gap-2 ml-4">
        {mobileMenuItems.map(item => (
          <Button
            key={item.id}
            variant="ghost"
            size="sm"
            icon={item.icon}
            onClick={() => setActiveView(item.id)}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
          >
            <span>{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  </div>

  {/* Mobile Menu Drawer */}
  <AnimatePresence>
    {mobileMenuOpen && (
      <motion.div
        className="fixed z-40 lg:hidden flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setMobileMenuOpen(false)}
      >
        <motion.div
          className="bg-white border-b border-gray-700 dark:bg-gray-900 shadow-xl p-4 flex flex-col gap-2 rounded-b-2xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        >
          {mobileMenuItems.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => {
                setActiveView(item.id)
                setMobileMenuOpen(false)
              }}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</motion.header>

  )
}
