import React from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Wallet,
  PieChart,
  Clock,
  Plus,
  ChevronRight
} from 'lucide-react';
import { MetricCard } from '../ui/MetricCard';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useFinancialStore } from '../../store/useFinancialStore';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export const Dashboard: React.FC = () => {
  const { incomeSources, expenses, goals } = useFinancialStore();

  const totalIncome = incomeSources.reduce((sum, source) => sum + source.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = totalIncome - totalExpenses;
  const monthlyTrend = 12;

  const expenseByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category.name;
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
    color: expenses.find(e => e.category.name === name)?.category.color || '#8884d8'
  }));

  const trendData = [
    { month: 'Nov', income: 1800, expenses: 1200 },
    { month: 'Dez', income: 2000, expenses: 1400 },
    { month: 'Jan', income: 2000, expenses: 1300 },
  ];

  const recentTransactions = [
    ...expenses.slice(0, 4).map(e => ({ ...e, type: 'expense' as const })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
            R$ {balance.toLocaleString('pt-BR')}
          </h2>
          <div className="flex items-center gap-1">
            <TrendingUp size={14} className="opacity-90" />
            <span className="text-xs opacity-90">+{monthlyTrend}% este mês</span>
          </div>
        </motion.div>
      </Card>

<div className="grid gap-3 grid-cols-[repeat(auto-fit,minmax(140px,1fr))]">
  <MetricCard
    title="Receitas"
    value={`R$ ${totalIncome.toLocaleString('pt-BR')}`}
    icon={TrendingUp}
    color="#10B981"
    delay={0.2}
  />
  <MetricCard
    title="Gastos"
    value={`R$ ${totalExpenses.toLocaleString('pt-BR')}`}
    icon={TrendingDown}
    color="#EF4444"
    delay={0.3}
  />
</div>


      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          icon={Plus}
          onClick={() => {}}
          className="h-12 text-xs"
        >
          Nova Receita
        </Button>
        <Button
          variant="outline"
          icon={Plus}
          onClick={() => {}}
          className="h-12 text-xs"
        >
          Novo Gasto
        </Button>
      </div>

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
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `R$ ${value}`} />
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
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 0, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#EF4444" 
                strokeWidth={2}
                dot={{ fill: '#EF4444', strokeWidth: 0, r: 3 }}
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

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Transações Recentes
          </h3>
          <div className="flex items-center gap-1 text-blue-500">
            <span className="text-xs">Ver todas</span>
            <ChevronRight size={14} />
          </div>
        </div>
        <div className="space-y-2">
          {recentTransactions.slice(0, 3).map((transaction, index) => (
            <motion.div
              key={transaction.id}
              className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                  transaction.type === 'expense' 
                    ? 'bg-red-100 dark:bg-red-900/20' 
                    : 'bg-green-100 dark:bg-green-900/20'
                }`}>
                  {transaction.type === 'expense' ? (
                    <TrendingDown size={12} className="text-red-600" />
                  ) : (
                    <TrendingUp size={12} className="text-green-600" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {transaction.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(transaction.date).toLocaleDateString('pt-BR', { 
                      day: '2-digit', 
                      month: 'short' 
                    })}
                  </p>
                </div>
              </div>
              <div className={`text-sm font-semibold flex-shrink-0 ${
                transaction.type === 'expense' 
                  ? 'text-red-600' 
                  : 'text-green-600'
              }`}>
                {transaction.type === 'expense' ? '-' : '+'}R$ {transaction.amount.toLocaleString('pt-BR')}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {goals.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Metas em Progresso
            </h3>
            <div className="flex items-center gap-1 text-blue-500">
              <span className="text-xs">Ver todas</span>
              <ChevronRight size={14} />
            </div>
          </div>
          <div className="space-y-3">
            {goals.slice(0, 2).map((goal) => {
              const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
              return (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {goal.title}
                    </span>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <motion.div
                      className="h-1.5 rounded-full"
                      style={{ backgroundColor: goal.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>R$ {goal.currentAmount.toLocaleString('pt-BR')}</span>
                    <span>R$ {goal.targetAmount.toLocaleString('pt-BR')}</span>
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