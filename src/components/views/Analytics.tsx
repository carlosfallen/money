import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Download,
  Filter,
  DollarSign,
  PieChart,
  Target,
  AlertTriangle
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MetricCard } from '../ui/MetricCard';
import { useFinancialStore } from '../../store/useFinancialStore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const Analytics: React.FC = () => {
  const { incomeSources, expenses, goals } = useFinancialStore();
  const [selectedPeriod, setSelectedPeriod] = useState('3months');
  const [selectedChart, setSelectedChart] = useState('overview');

  // Calculate metrics
  const totalIncome = incomeSources.reduce((sum, source) => sum + source.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100) : 0;

  // Generate monthly data for the last 6 months
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), 5 - i);
    const monthName = format(date, 'MMM', { locale: ptBR });
    
    // Mock data - in real app, this would come from historical data
    const baseIncome = 1800 + Math.random() * 400;
    const baseExpenses = 1200 + Math.random() * 300;
    
    return {
      month: monthName,
      income: Math.round(baseIncome),
      expenses: Math.round(baseExpenses),
      balance: Math.round(baseIncome - baseExpenses)
    };
  });

  // Expense by category data
  const expenseByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category.name;
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
    color: expenses.find(e => e.category.name === name)?.category.color || '#8884d8'
  }));

  // Weekly spending trend
  const weeklyData = Array.from({ length: 4 }, (_, i) => ({
    week: `Sem ${i + 1}`,
    spending: Math.round(300 + Math.random() * 200),
    budget: 400
  }));

  const insights = [
    {
      type: 'warning',
      title: 'Gasto Alto em Transporte',
      description: 'Você gastou 25% mais em transporte este mês comparado ao anterior.',
      action: 'Ver detalhes'
    },
    {
      type: 'success',
      title: 'Meta de Economia Atingida',
      description: 'Parabéns! Você economizou R$ 300 este mês.',
      action: 'Continuar'
    },
    {
      type: 'info',
      title: 'Oportunidade de Investimento',
      description: 'Com sua economia atual, você pode investir em renda fixa.',
      action: 'Explorar'
    }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="text-warning-500" size={20} />;
      case 'success':
        return <Target className="text-success-500" size={20} />;
      default:
        return <TrendingUp className="text-primary-500" size={20} />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-warning-200 bg-warning-50 dark:border-warning-800 dark:bg-warning-900/10';
      case 'success':
        return 'border-success-200 bg-success-50 dark:border-success-800 dark:bg-success-900/10';
      default:
        return 'border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/10';
    }
  };

  return (
    <div className="px-4 pb-20 space-y-6">
      {/* Period Selector */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Período de Análise
          </h3>
          <Button variant="ghost" size="sm" icon={Download}>
            Exportar
          </Button>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {[
            { id: '1month', label: '1 Mês' },
            { id: '3months', label: '3 Meses' },
            { id: '6months', label: '6 Meses' },
            { id: '1year', label: '1 Ano' }
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                selectedPeriod === period.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          title="Taxa de Economia"
          value={`${savingsRate.toFixed(1)}%`}
          trend={savingsRate > 20 ? 5 : -2}
          icon={Target}
          color="#10B981"
          delay={0}
        />
        <MetricCard
          title="Gasto Médio Diário"
          value={`R$ ${(totalExpenses / 30).toFixed(0)}`}
          icon={BarChart3}
          color="#F59E0B"
          delay={0.1}
        />
      </div>

      {/* Chart Selector */}
      <Card>
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
            { id: 'trends', label: 'Tendências', icon: TrendingUp },
            { id: 'categories', label: 'Categorias', icon: PieChart }
          ].map((chart) => {
            const Icon = chart.icon;
            return (
              <button
                key={chart.id}
                onClick={() => setSelectedChart(chart.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  selectedChart === chart.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={16} />
                {chart.label}
              </button>
            );
          })}
        </div>

        {/* Charts */}
        <div className="h-64">
          {selectedChart === 'overview' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#F9FAFB'
                  }}
                />
                <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'trends' && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: '#F9FAFB'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {selectedChart === 'categories' && (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `R$ ${value}`} />
              </RechartsPieChart>
            </ResponsiveContainer>
          )}
        </div>

        {selectedChart === 'categories' && (
          <div className="flex flex-wrap gap-2 mt-4">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Weekly Spending */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Gastos Semanais vs Orçamento
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="week" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '12px',
                  color: '#F9FAFB'
                }}
              />
              <Bar dataKey="spending" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="budget" fill="#6B7280" radius={[4, 4, 0, 0]} opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Insights */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Insights Inteligentes
        </h3>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-xl border-2 ${getInsightColor(insight.type)}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {insight.description}
                  </p>
                  <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                    {insight.action} →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Financial Health Score */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Score de Saúde Financeira
        </h3>
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="50"
                stroke="#10B981"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={314}
                initial={{ strokeDashoffset: 314 }}
                animate={{ strokeDashoffset: 314 - (314 * 0.75) }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">75</div>
                <div className="text-xs text-gray-500">Bom</div>
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Sua saúde financeira está boa! Continue economizando e investindo.
          </p>
        </div>
      </Card>
    </div>
  );
};