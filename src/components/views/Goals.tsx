import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Target, 
  Calendar, 
  TrendingUp,
  Trophy,
  AlertCircle,
  Trash2,
  X,
  DollarSign
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useFinancialStore } from '../../store/useFinancialStore';

export const Goals: React.FC = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useFinancialStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    color: '#3B82F6'
  });

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetAmount) {
      addGoal({
        title: newGoal.title,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount) || 0,
        deadline: newGoal.deadline,
        category: newGoal.category || 'Geral',
        priority: newGoal.priority,
        color: newGoal.color
      });
      setNewGoal({
        title: '',
        targetAmount: '',
        currentAmount: '',
        deadline: '',
        category: '',
        priority: 'medium',
        color: '#3B82F6'
      });
      setShowAddForm(false);
    }
  };

  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return 'Média';
    }
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  const completedGoals = goals.filter(goal => goal.currentAmount >= goal.targetAmount);
  const activeGoals = goals.filter(goal => goal.currentAmount < goal.targetAmount);

  return (
    <div className="p-4 pb-20 space-y-4 mx-auto">
      <div className="mt-2 grid grid-cols-2 gap-3">
        <Card className="p-3 text-center">
          <Target size={20} className="mx-auto mb-2 text-primary-500" />
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Metas Ativas</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {activeGoals.length}
          </p>
        </Card>
        <Card className="p-3 text-center">
          <Trophy size={20} className="mx-auto mb-2 text-success-500" />
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Conquistadas</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {completedGoals.length}
          </p>
        </Card>
      </div>

      <Button
        variant="primary"
        icon={Plus}
        onClick={() => setShowAddForm(true)}
        fullWidth
        className="h-12"
      >
        Criar Nova Meta
      </Button>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-t-2xl w-full max-h-[85vh] overflow-y-auto"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Nova Meta
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Título da Meta
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="Ex: Viagem de férias, Carro novo..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Valor Alvo (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newGoal.targetAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="0,00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Valor Atual (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newGoal.currentAmount}
                      onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="0,00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Data Limite
                  </label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Categoria
                    </label>
                    <input
                      type="text"
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="Ex: Lazer, Emergência..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prioridade
                    </label>
                    <select
                      value={newGoal.priority}
                      onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    >
                      <option value="low">Baixa</option>
                      <option value="medium">Média</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cor da Meta
                  </label>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewGoal({ ...newGoal, color })}
                        className={`w-8 h-8 rounded-full border-2 ${
                          newGoal.color === color ? 'border-gray-900 dark:border-white' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 h-10 text-sm"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleAddGoal}
                    className="flex-1 h-10 text-sm"
                  >
                    Criar Meta
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {completedGoals.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Trophy size={16} className="text-success-500" />
              Metas Conquistadas
            </h3>
            {completedGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-3 border-2 border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-900/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Trophy size={16} className="text-success-500 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {goal.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {goal.category}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="text-center py-3">
                    <p className="text-lg font-bold text-success-600 mb-1">
                      Meta Conquistada!
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      R$ {goal.targetAmount.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {activeGoals.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Metas Ativas
            </h3>
            {activeGoals.map((goal, index) => {
              const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
              const remaining = goal.targetAmount - goal.currentAmount;
              const overdue = isOverdue(goal.deadline);
              
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-3 ${overdue ? 'border-2 border-red-200 dark:border-red-800' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${goal.color}20` }}
                        >
                          <Target 
                            size={20} 
                            style={{ color: goal.color }} 
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate flex items-center gap-1">
                            {goal.title}
                            {overdue && <AlertCircle size={12} className="text-red-500 flex-shrink-0" />}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {goal.category} • {getPriorityText(goal.priority)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Progresso</span>
                        <span className="text-xs font-medium">{progress.toFixed(0)}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full relative overflow-hidden"
                          style={{ backgroundColor: goal.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        >
                          {progress > 80 && (
                            <motion.div
                              className="absolute inset-0 bg-white/20"
                              animate={{ 
                                scale: [1, 1.05, 1],
                                opacity: [0.5, 0.8, 0.5]
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                          )}
                        </motion.div>
                      </div>

                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">
                          R$ {goal.currentAmount.toLocaleString('pt-BR')}
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          R$ {goal.targetAmount.toLocaleString('pt-BR')}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Faltam</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          R$ {remaining.toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Calendar size={10} />
                          Prazo
                        </p>
                        <p className={`text-sm font-semibold ${overdue ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                          {new Date(goal.deadline).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short'
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={DollarSign}
                        onClick={() => {
                          const amount = prompt('Quanto você quer adicionar à meta?');
                          if (amount && !isNaN(parseFloat(amount))) {
                            updateGoal(goal.id, {
                              currentAmount: Math.min(goal.currentAmount + parseFloat(amount), goal.targetAmount)
                            });
                          }
                        }}
                        className="flex-1 h-8 text-xs"
                      >
                        Adicionar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={TrendingUp}
                        onClick={() => {}}
                        className="h-8 px-2"
                      >
                        Dicas
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {goals.length === 0 && (
          <Card className="text-center py-8">
            <Target size={48} className="mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Nenhuma meta criada
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
              Comece definindo seus objetivos financeiros
            </p>
            <Button
              variant="primary"
              onClick={() => setShowAddForm(true)}
            >
              Criar Primeira Meta
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};