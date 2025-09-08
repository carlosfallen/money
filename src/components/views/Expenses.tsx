import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Car, 
  Home, 
  ShoppingBag, 
  Receipt, 
  Heart, 
  UtensilsCrossed,
  Calendar,
  Filter,
  Trash2,
  X,
  ChevronDown
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useFinancialStore } from '../../store/useFinancialStore';

const categoryIcons = {
  Car: Car,
  Home: Home,
  ShoppingBag: ShoppingBag,
  Receipt: Receipt,
  Heart: Heart,
  UtensilsCrossed: UtensilsCrossed,
};

interface ExpensesProps {
  openForm?: boolean;
}

export const Expenses: React.FC<ExpensesProps> = ({ openForm }) => {
  const {
    expenses,
    expenseCategories,
    addExpense,
    deleteExpense,
    showAddExpenseForm,
    setShowAddExpenseForm
  } = useFinancialStore();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    recurring: false
  });

  useEffect(() => {
    if (openForm) setShowAddExpenseForm(true);
  }, [openForm, setShowAddExpenseForm]);

  const handleAddExpense = () => {
    const category = expenseCategories.find(c => c.id === selectedCategory);
    if (!newExpense.title || !newExpense.amount || !category) return;

    addExpense({
      title: newExpense.title,
      amount: parseFloat(newExpense.amount),
      category,
      date: newExpense.date,
      description: newExpense.description,
      recurring: newExpense.recurring
    });

    setNewExpense({
      title: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      recurring: false
    });
    setSelectedCategory('');
    setShowAddExpenseForm(false);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const expensesByCategory = expenses.reduce((acc, expense) => {
    const categoryName = expense.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = { category: expense.category, expenses: [], total: 0 };
    }
    acc[categoryName].expenses.push(expense);
    acc[categoryName].total += expense.amount;
    return acc;
  }, {} as Record<string, { category: any; expenses: any[]; total: number }>);

  return (
    <div className="p-4 pb-20 space-y-4 mx-auto">

      <Card className="p-4 bg-gradient-to-r from-red-500 to-pink-600 text-white">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Total de Gastos</span>
            <Receipt size={20} className="opacity-90" />
          </div>
          <h2 className="text-2xl font-bold mb-1">R$ {totalExpenses.toLocaleString('pt-BR')}</h2>
          <p className="text-xs opacity-90">
            {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </p>
        </motion.div>
      </Card>

      <Button
        variant="primary"
        icon={Plus}
        onClick={() => setShowAddExpenseForm(true)}
        fullWidth
        className="h-12"
      >
        Adicionar Gasto
      </Button>

      <AnimatePresence>
        {showAddExpenseForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddExpenseForm(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-h-[85vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Novo Gasto</h3>
                  <button onClick={() => setShowAddExpenseForm(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Título</label>
                  <input
                    type="text"
                    value={newExpense.title}
                    onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="Ex: Combustível, Almoço..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categoria</label>
                  <div className="grid grid-cols-2 gap-2">
                    {expenseCategories.map((category) => {
                      const IconComponent = categoryIcons[category.icon as keyof typeof categoryIcons];
                      return (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`p-2.5 rounded-lg border-2 flex items-center gap-2 transition-all text-left ${
                            selectedCategory === category.id
                              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {IconComponent && <IconComponent size={16} style={{ color: category.color }} className="flex-shrink-0" />}
                          <span className="text-xs font-medium text-gray-900 dark:text-white truncate">{category.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Valor (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="0,00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data</label>
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descrição (opcional)</label>
                  <textarea
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    rows={2}
                    placeholder="Detalhes adicionais..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={newExpense.recurring}
                    onChange={(e) => setNewExpense({ ...newExpense, recurring: e.target.checked })}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="recurring" className="text-sm font-medium text-gray-700 dark:text-gray-300">Gasto recorrente</label>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowAddExpenseForm(false)} className="flex-1 h-10 text-sm">Cancelar</Button>
                  <Button variant="primary" onClick={handleAddExpense} className="flex-1 h-10 text-sm">Adicionar</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Aqui entra a listagem por categoria */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Por Categoria</h3>
          <Button variant="ghost" size="sm" icon={Filter} className="h-8 px-2">Filtrar</Button>
        </div>

        {Object.entries(expensesByCategory).map(([categoryName, data], index) => {
          const IconComponent = categoryIcons[data.category.icon as keyof typeof categoryIcons];
          const percentage = (data.total / totalExpenses) * 100;
          const isExpanded = expandedCategory === categoryName;

          return (
            <motion.div key={categoryName} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="p-3">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedCategory(isExpanded ? null : categoryName)}>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${data.category.color}20` }}>
                      {IconComponent && <IconComponent size={20} style={{ color: data.category.color }} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{categoryName}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{data.expenses.length} transação{data.expenses.length !== 1 ? 'ões' : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">R$ {data.total.toLocaleString('pt-BR')}</p>
                      <p className="text-xs text-gray-500">{percentage.toFixed(0)}%</p>
                    </div>
                    <ChevronDown size={16} className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-3 mb-2">
                  <motion.div className="h-1.5 rounded-full" style={{ backgroundColor: data.category.color }} initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1, ease: "easeOut" }} />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="space-y-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      {data.expenses.map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white text-sm truncate">{expense.title}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <Calendar size={10} />
                              {new Date(expense.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white text-sm">R$ {expense.amount.toLocaleString('pt-BR')}</span>
                            <button onClick={() => deleteExpense(expense.id)} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-6 h-6 rounded flex items-center justify-center">
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}

        {Object.keys(expensesByCategory).length === 0 && (
          <Card className="text-center py-8">
            <Receipt size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nenhum gasto registrado</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Comece registrando seus primeiros gastos</p>
            <Button variant="primary" onClick={() => setShowAddExpenseForm(true)}>Adicionar Primeiro Gasto</Button>
          </Card>
        )}
      </div>
    </div>
  );
};
