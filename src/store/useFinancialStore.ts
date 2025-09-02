import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IncomeSource, Expense, Goal, Transaction, ServiceAppointment, ExpenseCategory } from '../types';
import { FirebaseService } from '../services/firebaseService';

interface FinancialStore {
  // Firebase service
  firebaseService: FirebaseService | null;
  setFirebaseService: (service: FirebaseService | null) => void;

  // Income Sources
  incomeSources: IncomeSource[];
  addIncomeSource: (source: Omit<IncomeSource, 'id'>) => void;
  updateIncomeSource: (id: string, updates: Partial<IncomeSource>) => void;
  deleteIncomeSource: (id: string) => void;
  setIncomeSources: (sources: IncomeSource[]) => void;

  // Expenses
  expenses: Expense[];
  expenseCategories: ExpenseCategory[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  setExpenses: (expenses: Expense[]) => void;

  // Goals
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  setGoals: (goals: Goal[]) => void;

  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;

  // Service Appointments
  serviceAppointments: ServiceAppointment[];
  addServiceAppointment: (appointment: Omit<ServiceAppointment, 'id'>) => void;
  updateServiceAppointment: (id: string, updates: Partial<ServiceAppointment>) => void;
  deleteServiceAppointment: (id: string) => void;
  setServiceAppointments: (appointments: ServiceAppointment[]) => void;

  // UI State
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeView: string;
  setActiveView: (view: string) => void;

  // Sync methods
  syncWithFirebase: () => Promise<void>;
}

const defaultCategories: ExpenseCategory[] = [
  { id: '1', name: 'Transporte', icon: 'Car', color: '#3B82F6' },
  { id: '2', name: 'Casa', icon: 'Home', color: '#10B981' },
  { id: '3', name: 'Compras', icon: 'ShoppingBag', color: '#F59E0B' },
  { id: '4', name: 'Contas Fixas', icon: 'Receipt', color: '#EF4444' },
  { id: '5', name: 'Saúde', icon: 'Heart', color: '#EC4899' },
  { id: '6', name: 'Alimentação', icon: 'UtensilsCrossed', color: '#8B5CF6' },
];

const defaultIncomeSources: IncomeSource[] = [
  {
    id: '1',
    name: 'Jorge',
    amount: 1500,
    expectedDate: '2024-01-05',
    status: 'received',
    color: '#3B82F6'
  },
  {
    id: '2',
    name: 'Igreja',
    amount: 400,
    expectedDate: '2024-01-10',
    status: 'pending',
    color: '#10B981'
  },
  {
    id: '3',
    name: 'Hotel',
    amount: 100,
    expectedDate: '2024-01-15',
    status: 'pending',
    color: '#F59E0B'
  }
];

const defaultExpenses: Expense[] = [
  {
    id: '1',
    title: 'Combustível',
    amount: 120,
    category: defaultCategories[0],
    date: '2024-01-03',
    description: 'Abastecimento do carro'
  },
  {
    id: '2',
    title: 'Conta de Luz',
    amount: 180,
    category: defaultCategories[3],
    date: '2024-01-02',
    recurring: true
  },
  {
    id: '3',
    title: 'Supermercado',
    amount: 250,
    category: defaultCategories[5],
    date: '2024-01-01'
  }
];

const defaultGoals: Goal[] = [
  {
    id: '1',
    title: 'Viagem de Férias',
    targetAmount: 3000,
    currentAmount: 1200,
    deadline: '2024-06-01',
    category: 'Lazer',
    priority: 'high',
    color: '#3B82F6'
  },
  {
    id: '2',
    title: 'Reserva de Emergência',
    targetAmount: 5000,
    currentAmount: 2800,
    deadline: '2024-12-31',
    category: 'Segurança',
    priority: 'high',
    color: '#10B981'
  }
];

export const useFinancialStore = create<FinancialStore>()(
  persist(
    (set, get) => ({
      // Firebase service
      firebaseService: null,
      setFirebaseService: (service) => set({ firebaseService: service }),

      // Initial state
      incomeSources: defaultIncomeSources,
      expenses: defaultExpenses,
      expenseCategories: defaultCategories,
      goals: defaultGoals,
      transactions: [],
      serviceAppointments: [],
      darkMode: false,
      activeView: 'dashboard',

      // Income Sources
      addIncomeSource: async (source) => {
        const newSource = { ...source, id: Date.now().toString() };
        set((state) => ({
          incomeSources: [...state.incomeSources, newSource]
        }));
        
        const { firebaseService } = get();
        if (firebaseService) {
          try {
            await firebaseService.saveIncomeSource(newSource);
          } catch (error) {
            console.error('Error saving income source to Firebase:', error);
          }
        }
      },

      updateIncomeSource: async (id, updates) => {
        set((state) => ({
          incomeSources: state.incomeSources.map((source) =>
            source.id === id ? { ...source, ...updates } : source
          )
        }));

        const { firebaseService, incomeSources } = get();
        if (firebaseService) {
          const updatedSource = incomeSources.find(s => s.id === id);
          if (updatedSource) {
            try {
              await firebaseService.saveIncomeSource(updatedSource);
            } catch (error) {
              console.error('Error updating income source in Firebase:', error);
            }
          }
        }
      },

      deleteIncomeSource: async (id) => {
        set((state) => ({
          incomeSources: state.incomeSources.filter((source) => source.id !== id)
        }));

        const { firebaseService } = get();
        if (firebaseService) {
          try {
            await firebaseService.deleteIncomeSource(id);
          } catch (error) {
            console.error('Error deleting income source from Firebase:', error);
          }
        }
      },

      setIncomeSources: (sources) => set({ incomeSources: sources }),

      // Expenses
      addExpense: async (expense) => {
        const newExpense = { ...expense, id: Date.now().toString() };
        set((state) => ({
          expenses: [...state.expenses, newExpense]
        }));

        const { firebaseService } = get();
        if (firebaseService) {
          try {
            await firebaseService.saveExpense(newExpense);
          } catch (error) {
            console.error('Error saving expense to Firebase:', error);
          }
        }
      },

      updateExpense: async (id, updates) => {
        set((state) => ({
          expenses: state.expenses.map((expense) =>
            expense.id === id ? { ...expense, ...updates } : expense
          )
        }));

        const { firebaseService, expenses } = get();
        if (firebaseService) {
          const updatedExpense = expenses.find(e => e.id === id);
          if (updatedExpense) {
            try {
              await firebaseService.saveExpense(updatedExpense);
            } catch (error) {
              console.error('Error updating expense in Firebase:', error);
            }
          }
        }
      },

      deleteExpense: async (id) => {
        set((state) => ({
          expenses: state.expenses.filter((expense) => expense.id !== id)
        }));

        const { firebaseService } = get();
        if (firebaseService) {
          try {
            await firebaseService.deleteExpense(id);
          } catch (error) {
            console.error('Error deleting expense from Firebase:', error);
          }
        }
      },

      setExpenses: (expenses) => set({ expenses }),

      // Goals
      addGoal: async (goal) => {
        const newGoal = { ...goal, id: Date.now().toString() };
        set((state) => ({
          goals: [...state.goals, newGoal]
        }));

        const { firebaseService } = get();
        if (firebaseService) {
          try {
            await firebaseService.saveGoal(newGoal);
          } catch (error) {
            console.error('Error saving goal to Firebase:', error);
          }
        }
      },

      updateGoal: async (id, updates) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updates } : goal
          )
        }));

        const { firebaseService, goals } = get();
        if (firebaseService) {
          const updatedGoal = goals.find(g => g.id === id);
          if (updatedGoal) {
            try {
              await firebaseService.saveGoal(updatedGoal);
            } catch (error) {
              console.error('Error updating goal in Firebase:', error);
            }
          }
        }
      },

      deleteGoal: async (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id)
        }));

        const { firebaseService } = get();
        if (firebaseService) {
          try {
            await firebaseService.deleteGoal(id);
          } catch (error) {
            console.error('Error deleting goal from Firebase:', error);
          }
        }
      },

      setGoals: (goals) => set({ goals }),

      // Transactions
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: Date.now().toString() }
          ]
        })),

      // Service Appointments
      addServiceAppointment: async (appointment) => {
        const newAppointment = { ...appointment, id: Date.now().toString() };
        set((state) => ({
          serviceAppointments: [...state.serviceAppointments, newAppointment]
        }));

        const { firebaseService } = get();
        if (firebaseService) {
          try {
            await firebaseService.saveServiceAppointment(newAppointment);
          } catch (error) {
            console.error('Error saving appointment to Firebase:', error);
          }
        }
      },

      updateServiceAppointment: async (id, updates) => {
        set((state) => ({
          serviceAppointments: state.serviceAppointments.map((appointment) =>
            appointment.id === id ? { ...appointment, ...updates } : appointment
          )
        }));

        const { firebaseService, serviceAppointments } = get();
        if (firebaseService) {
          const updatedAppointment = serviceAppointments.find(a => a.id === id);
          if (updatedAppointment) {
            try {
              await firebaseService.saveServiceAppointment(updatedAppointment);
            } catch (error) {
              console.error('Error updating appointment in Firebase:', error);
            }
          }
        }
      },

      deleteServiceAppointment: async (id) => {
        set((state) => ({
          serviceAppointments: state.serviceAppointments.filter((appointment) => appointment.id !== id)
        }));

        const { firebaseService } = get();
        if (firebaseService) {
          try {
            await firebaseService.deleteServiceAppointment(id);
          } catch (error) {
            console.error('Error deleting appointment from Firebase:', error);
          }
        }
      },

      setServiceAppointments: (appointments) => set({ serviceAppointments: appointments }),

      // UI State
      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),

      setActiveView: (view) =>
        set({ activeView: view }),

      // Sync methods
      syncWithFirebase: async () => {
        const { firebaseService } = get();
        if (!firebaseService) return;

        try {
          const [incomeSources, expenses, goals, serviceAppointments] = await Promise.all([
            firebaseService.getIncomeSources(),
            firebaseService.getExpenses(),
            firebaseService.getGoals(),
            firebaseService.getServiceAppointments()
          ]);

          set({
            incomeSources,
            expenses,
            goals,
            serviceAppointments
          });
        } catch (error) {
          console.error('Error syncing with Firebase:', error);
        }
      }
    }),
    {
      name: 'financial-store',
      partialize: (state) => ({
        darkMode: state.darkMode,
        activeView: state.activeView,
        // Don't persist Firebase data as it will be synced
      }),
    }
  )
);