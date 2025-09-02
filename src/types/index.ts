export interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  expectedDate: string;
  status: 'received' | 'pending' | 'overdue';
  color: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description?: string;
  recurring?: boolean;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  budget?: number;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  color: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export interface ServiceAppointment {
  id: string;
  title: string;
  date: string;
  estimatedCost: number;
  status: 'scheduled' | 'in-progress' | 'completed';
  category: string;
  description?: string;
}

export interface FinancialStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  monthlyTrend: number;
  topCategories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}