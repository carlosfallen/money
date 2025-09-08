import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  PieChart,
  Plus,
  ChevronRight
} from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { subMonths, format } from 'date-fns';
import { useFinancialStore } from '../../store/useFinancialStore';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export const Dashboard: React.FC = () => {
  const { 
    incomeSources, 
    expenses,  
    goals, 
    expenseCategories,
    setActiveView 
  } = useFinancialStore();
  
  const totalIncome = incomeSources?.reduce((sum, source) => sum + (source.amount || 0), 0) || 0;
  const totalExpenses = expenses?.reduce((sum, expense) => sum + (expense.amount || 0), 0) || 0;
  const balance = totalIncome - totalExpenses;
  const monthlyTrend = 12;

const expenseByCategory = expenses?.reduce((acc, expense) => {
  const categoryName = expense.category?.name || 'Outros';
  acc[categoryName] = (acc[categoryName] || 0) + (expense.amount || 0);
  return acc;
}, {} as Record<string, number>) || {};

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => {
    const category = expenseCategories?.find(cat => cat.name === name);
    return {
      name,
      value,
      color: category?.color || '#8884d8'
    };
  }).filter(item => item.value > 0);

const now = new Date();

// Gera os últimos 3 meses (incluindo o atual)
const months = Array.from({ length: 3 }).map((_, i) => {
  const date = subMonths(now, 2 - i);
  return {
    label: format(date, 'MMM'), // ex: 'Set', 'Out', 'Nov'
    month: date.getMonth(),
    year: date.getFullYear(),
  };
});

// Calcula trendData real
const trendData = months.map(({ label, month, year }) => {
  // Soma receitas do mês
  const income = incomeSources
    ?.filter(src => src.expectedDate)
    .filter(src => {
      const d = new Date(src.expectedDate!);
      return d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((sum, src) => sum + (src.amount || 0), 0) || 0;

  // Soma despesas do mês
  const expensesTotal = expenses
    ?.filter(exp => exp.date)
    .filter(exp => {
      const d = new Date(exp.date!);
      return d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0;

  return {
    month: label,
    income,
    expenses: expensesTotal,
  };
});
  // Usar apenas expenses como transações recentes
  const recentTransactions = expenses
    ?.slice(0, 4)
    .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()) || [];

  const handleNewIncome = () => {
    setActiveView?.('income');
    useFinancialStore.getState().setShowAddIncomeForm(true);
  };

const handleNewExpense = () => {
  setActiveView?.('expenses');
  useFinancialStore.getState().setShowAddExpenseForm(true);
};


  const handleViewAllGoals = () => {
    setActiveView?.('goals');
  };

  return (
    <div className="p-4 pb-20 space-y-4 mx-auto">
      <Card className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-90">Saldo Total</span>
            <Wallet size={20} className="opacity-90" />
          </div>
          <h2 className="text-2xl font-bold mb-1">
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
          <div className="flex items-center gap-1">
            <TrendingUp size={14} className="opacity-90" />
            <span className="text-xs opacity-90">{monthlyTrend >= 0 ? '+' : ''}{monthlyTrend}% vs média anterior</span>
          </div>
        </motion.div>
      </Card>

      <div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
        <MetricCard
          title="Receitas"
          value={`R$ ${totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={TrendingUp}
          color="#10B981"
          delay={0.2}
        />
        <MetricCard
          title="Gastos"
          value={`R$ ${totalExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={TrendingDown}
          color="#EF4444"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          icon={Plus}
          onClick={handleNewIncome}
          className="h-12 text-xs"
        >
          Nova Receita
        </Button>
        <Button
          variant="outline"
          icon={Plus}
          onClick={handleNewExpense}
          className="h-12 text-xs"
        >
          Novo Gasto
        </Button>
      </div>

      {pieData.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Distribuição de Gastos
            </h3>
            <PieChart size={16} className="text-gray-500" />
          </div>
          <div className="h-40 mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  nameKey="name"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                    name, // aqui aparece o nome da categoria
                  ]}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {pieData.slice(0, 4).map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    
      {totalIncome > 0 && (
        <Card className="p-4">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Tendência (3 meses)
          </h3>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis hide />
                <Tooltip 
                  formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 0, r: 3 }}
                  name="Ganhos" 
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={{ fill: '#EF4444', strokeWidth: 0, r: 3 }}
                  name="Gastos" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Receitas</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Gastos</span>
            </div>
          </div>
        </Card>
      )}

      {recentTransactions.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Gastos Recentes
            </h3>
            <button 
              onClick={handleNewExpense}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <span className="text-xs">Ver todas</span>
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {recentTransactions.slice(0, 3).map((expense, index) => (
              <motion.div
                key={expense.id}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-1.5 rounded-lg flex-shrink-0 bg-red-100 dark:bg-red-900/20">
                    <TrendingDown size={12} className="text-red-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {expense.description || expense.title || 'Gasto sem descrição'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {expense.date ? new Date(expense.date).toLocaleDateString('pt-BR', { 
                        day: '2-digit', 
                        month: 'short' 
                      }) : 'Data não informada'}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-semibold flex-shrink-0 text-red-600">
                  -R$ {(expense.amount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {goals && goals.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Metas em Progresso
            </h3>
            <button 
              onClick={handleViewAllGoals}
              className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
            >
              <span className="text-xs">Ver todas</span>
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {goals.slice(0, 2).map((goal) => {
              const currentAmount = goal.currentAmount || 0;
              const targetAmount = goal.targetAmount || 1;
              const progress = Math.min((currentAmount / targetAmount) * 100, 100);
              
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {goal.title || goal.title || 'Meta sem título'}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <motion.div
                      className="h-1.5 rounded-full"
                      style={{ backgroundColor: goal.color || '#3B82F6' }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>R$ {currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    <span>R$ {targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};