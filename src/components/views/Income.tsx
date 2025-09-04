import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Trash2,
  X,
  TrendingUp
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useFinancialStore } from '../../store/useFinancialStore';

export const Income: React.FC = () => {
  const { incomeSources, addIncomeSource, updateIncomeSource, deleteIncomeSource } = useFinancialStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSource, setNewSource] = useState({
    name: '',
    amount: '',
    expectedDate: '',
    color: '#3B82F6'
  });

  const handleAddSource = () => {
    if (newSource.name && newSource.amount) {
      addIncomeSource({
        name: newSource.name,
        amount: parseFloat(newSource.amount),
        expectedDate: newSource.expectedDate,
        status: 'pending',
        color: newSource.color
      });
      setNewSource({ name: '', amount: '', expectedDate: '', color: '#3B82F6' });
      setShowAddForm(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'received':
        return <CheckCircle className="text-green-500" size={16} />;
      case 'pending':
        return <Clock className="text-orange-500" size={16} />;
      case 'overdue':
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return <Clock className="text-gray-500" size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'received':
        return 'Recebido';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Atrasado';
      default:
        return 'Pendente';
    }
  };

  const totalIncome = incomeSources.reduce((sum, source) => sum + source.amount, 0);
  const receivedIncome = incomeSources
    .filter(source => source.status === 'received')
    .reduce((sum, source) => sum + source.amount, 0);

  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'
  ];

  return (
    <div className="p-4 pb-20 space-y-4 mx-auto">
<div className="grid grid-cols-2 gap-3">
  <Card className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-center min-w-0">
    <DollarSign size={24} className="mx-auto mb-2" />
    <p className="text-xs opacity-90 mb-1">Total Esperado</p>
    <p className="text-lg font-bold">
      R$ {totalIncome.toLocaleString('pt-BR')}
    </p>
  </Card>

  <Card className="p-4 text-center bg-white dark:bg-gray-800 shadow-md min-w-0">
    <CheckCircle size={24} className="mx-auto mb-2 text-green-500" />
    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Recebido</p>
    <p className="text-lg font-bold text-gray-900 dark:text-white">
      R$ {receivedIncome.toLocaleString('pt-BR')}
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
        Adicionar Fonte de Renda
      </Button>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddForm(false)}
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
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Nova Fonte de Renda
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
                    Nome da Fonte
                  </label>
                  <input
                    type="text"
                    value={newSource.name}
                    onChange={(e) => setNewSource({ ...newSource, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    placeholder="Ex: Freelance, Salário..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Valor (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newSource.amount}
                      onChange={(e) => setNewSource({ ...newSource, amount: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      placeholder="0,00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data Esperada
                    </label>
                    <input
                      type="date"
                      value={newSource.expectedDate}
                      onChange={(e) => setNewSource({ ...newSource, expectedDate: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cor
                  </label>
                  <div className="flex gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewSource({ ...newSource, color })}
                        className={`w-8 h-8 rounded-full border-2 ${
                          newSource.color === color ? 'border-gray-900 dark:border-white' : 'border-transparent'
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
                    onClick={handleAddSource}
                    className="flex-1 h-10 text-sm"
                  >
                    Adicionar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Fontes de Renda
        </h3>
        
        {incomeSources.map((source, index) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${source.color}20` }}
                  >
                    <DollarSign 
                      size={20} 
                      style={{ color: source.color }} 
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                      {source.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Calendar size={10} />
                      {source.expectedDate ? new Date(source.expectedDate).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'short'
                      }) : 'Sem data'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    R$ {source.amount.toLocaleString('pt-BR')}
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    {getStatusIcon(source.status)}
                    <span className="text-xs">
                      {getStatusText(source.status)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={source.status === 'received' ? 'ghost' : 'primary'}
                  size="sm"
                  onClick={() => updateIncomeSource(source.id, {
                    status: source.status === 'received' ? 'pending' : 'received'
                  })}
                  className="flex-1 h-8 text-xs"
                >
                  {source.status === 'received' ? 'Marcar Pendente' : 'Marcar Recebido'}
                </Button>
                <button
                  onClick={() => deleteIncomeSource(source.id)}
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-8 h-8 rounded flex items-center justify-center"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Resumo Mensal
          </h3>
          <TrendingUp size={16} className="text-green-500" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              R$ {totalIncome.toLocaleString('pt-BR')}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${totalIncome > 0 ? (receivedIncome / totalIncome) * 100 : 0}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Recebido: R$ {receivedIncome.toLocaleString('pt-BR')}</span>
            <span>{totalIncome > 0 ? ((receivedIncome / totalIncome) * 100).toFixed(0) : 0}%</span>
          </div>
        </div>
      </Card>

      {incomeSources.length === 0 && (
        <Card className="text-center py-8">
          <DollarSign size={48} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Nenhuma fonte de renda
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Adicione suas fontes de renda para começar
          </p>
          <Button
            variant="primary"
            onClick={() => setShowAddForm(true)}
          >
            Adicionar Primeira Fonte
          </Button>
        </Card>
      )}
    </div>
  );
};