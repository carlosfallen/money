export interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  expectedDate: string;
  status: 'received' | 'pending' | 'overdue';
  color: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  displayName: string;
  loginMethod: 'google' | 'email' | 'phone';
  avatarUrl?: string;
  incomeSources: IncomeSource[];
  expenses: Expense[];
  goals: Goal[];
  createdAt: string;
  updatedAt: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory; // agora é objeto
  date: string;
  description?: string;
  recurring?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
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
  createdAt?: Date;
  updatedAt?: Date;
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

export interface Appointment {
  id: string;
  title: string;
  date: string;
  type: 'income' | 'expense' | 'goal' | 'reminder';
  amount?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
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