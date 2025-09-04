// types/auth.ts
import { User } from 'firebase/auth';

export interface AuthUser extends User {}

export interface LoginScreenProps {
  onAuthSuccess?: (user: AuthUser) => void;
}

export interface AuthServiceResponse {
  user: AuthUser;
  error?: string;
}

// types/firebase.ts
export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  lastLogin: Date;
}

export interface IncomeSource {
  id: string;
  name: string;
  amount: number;
  frequency: 'monthly' | 'weekly' | 'daily' | 'annual';
  category: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: Date;
  description?: string;
  isRecurring: boolean;
  frequency?: 'monthly' | 'weekly' | 'daily' | 'annual';
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface Appointment {
  id: string;
  title: string;
  date: Date;
  type: 'income' | 'expense' | 'goal' | 'reminder';
  amount?: number;
  description?: string;
}

export interface FirebaseCallbacks {
  onIncomeSources: (sources: IncomeSource[]) => void;
  onExpenses: (expenses: Expense[]) => void;
  onGoals: (goals: Goal[]) => void;
  onAppointments: (appointments: Appointment[]) => void;
}