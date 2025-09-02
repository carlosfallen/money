import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  DollarSign, 
  CreditCard, 
  BarChart3, 
  Target, 
  Calendar,
  Settings
} from 'lucide-react';
import { useFinancialStore } from '../../store/useFinancialStore';

export const navItems = [
  { id: 'dashboard', icon: Home, label: 'Início' },
  { id: 'income', icon: DollarSign, label: 'Receitas' },
  { id: 'expenses', icon: CreditCard, label: 'Gastos' },
  //{ id: 'analytics', icon: BarChart3, label: 'Relatórios' },
  { id: 'goals', icon: Target, label: 'Metas' },
  //{ id: 'calendar', icon: Calendar, label: 'Agenda' },
  { id: 'settings', icon: Settings, label: 'Configurações' },
];

export const NavigationBar: React.FC = () => {
  const { activeView, setActiveView } = useFinancialStore();

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
    >
<div className="flex items-center justify-between">
  {navItems
    .filter(item => item.id !== 'settings') // remove Configurações só aqui
    .map((item, index) => {
      const isActive = activeView === item.id
      const Icon = item.icon

      return (
        <motion.button
          key={item.id}
          onClick={() => setActiveView(item.id)}
          className="flex flex-col items-center justify-center flex-1 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className={`p-2 rounded-xl transition-all duration-200 ${
              isActive
                ? "bg-primary-500 text-white shadow-lg"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
            animate={{
              scale: isActive ? 1.1 : 1,
              y: isActive ? -2 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <Icon size={20} />
          </motion.div>
          <motion.span
            className={`text-xs mt-1 font-medium transition-colors duration-200 ${
              isActive
                ? "text-primary-600 dark:text-primary-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
            animate={{
              opacity: isActive ? 1 : 0.7,
              scale: isActive ? 1.05 : 1,
            }}
          >
            {item.label}
          </motion.span>
        </motion.button>
      )
    })}
</div>

    </motion.nav>
  );
};