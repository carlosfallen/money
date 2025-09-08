import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IncomeSource, Expense, Goal, Transaction, ExpenseCategory } from '../types';
import { FirebaseService } from '../services/firebaseService';

interface FinancialStore {
  firebaseService: FirebaseService | null;
  setFirebaseService: (service: FirebaseService | null) => void;

  loading: { incomeSources: boolean; expenses: boolean; goals: boolean };

  incomeSources: IncomeSource[];
  addIncomeSource: (source: Omit<IncomeSource, 'id'>) => void;
  updateIncomeSource: (id: string, updates: Partial<IncomeSource>) => void;
  deleteIncomeSource: (id: string) => void;
  showAddIncomeForm: boolean;
  setShowAddIncomeForm: (show: boolean) => void;


  showAddExpenseForm: boolean;
  setShowAddExpenseForm: (value: boolean) => void;
  setIncomeSources: (sources: IncomeSource[]) => void;
  getIncomeSourceById: (id: string) => IncomeSource | undefined;
  subscribeToIncomeSources: (callback: (data: IncomeSource[]) => void) => () => void;

  expenses: Expense[];
  expenseCategories: ExpenseCategory[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  setExpenses: (expenses: Expense[]) => void;
  getExpenseById: (id: string) => Expense | undefined;
  subscribeToExpenses: (callback: (data: Expense[]) => void) => () => void;

  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  setGoals: (goals: Goal[]) => void;
  getGoalById: (id: string) => Goal | undefined;
  subscribeToGoals: (callback: (data: Goal[]) => void) => () => void;

  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  setTransactions: (transactions: Transaction[]) => void;
  getTransactionById: (id: string) => Transaction | undefined;

  darkMode: boolean;
  toggleDarkMode: () => void;
  activeView: string;
  setActiveView: (view: string) => void;

  syncWithFirebase: () => Promise<void>;
  loadUserData: (userId: string) => Promise<void>;
  getAllUserData: (userId: string) => Promise<void>;

  currentUserId: string | null;
  setCurrentUserId: (userId: string | null) => void;

  unsubscribeFunctions: (() => void)[];
  clearSubscriptions: () => void;
}

const defaultCategories: ExpenseCategory[] = [
  { id: '1', name: 'Transporte', icon: 'Car', color: '#3B82F6' },
  { id: '2', name: 'Casa', icon: 'Home', color: '#10B981' },
  { id: '3', name: 'Compras', icon: 'ShoppingBag', color: '#F59E0B' },
  { id: '4', name: 'Contas Fixas', icon: 'Receipt', color: '#EF4444' },
  { id: '5', name: 'Saúde', icon: 'Heart', color: '#EC4899' },
  { id: '6', name: 'Alimentação', icon: 'UtensilsCrossed', color: '#8B5CF6' },
];

export const useFinancialStore = create<FinancialStore>()(
  persist(
    (set, get) => ({
      firebaseService: null,
      setFirebaseService: (service) => set({ firebaseService: service }),

      loading: { incomeSources: false, expenses: false, goals: false },

      incomeSources: [],
      expenses: [],
      expenseCategories: defaultCategories,
      goals: [],
      transactions: [],
      darkMode: false,
      activeView: 'dashboard',
      currentUserId: null,
      unsubscribeFunctions: [],
      showAddExpenseForm: false,
      showAddIncomeForm: false,
      setShowAddExpenseForm: (value: boolean) => set({ showAddExpenseForm: value }),
      setShowAddIncomeForm: (value: boolean) => set({ showAddIncomeForm: value }),
      setCurrentUserId: (userId) => set({ currentUserId: userId }),

      clearSubscriptions: () => {
        get().unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
        set({ unsubscribeFunctions: [] });
      },

loadUserData: async () => {
  const { firebaseService } = get();
  if (!firebaseService) return;

  set({ loading: { incomeSources: true, expenses: true, goals: true } });

  try {
    const data = await firebaseService.getAllUserData();

    set({
      incomeSources: data.income || [],
      expenses: data.expenses || [],
      goals: data.goals || [],
      loading: { incomeSources: false, expenses: false, goals: false }
    });
  } catch (error) {
    console.error('Erro ao carregar dados do usuário:', error);
    set({ loading: { incomeSources: false, expenses: false, goals: false } });
  }
},

      getAllUserData: async (userId: string) => get().loadUserData(userId),

      // Income sources
      addIncomeSource: async (source) => {
        const { firebaseService, currentUserId } = get();
        if (!firebaseService || !currentUserId) return;

        const newSource: IncomeSource = {
          ...source,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({ incomeSources: [...state.incomeSources, newSource] }));

        try {
          await firebaseService.saveUserIncomeSource(currentUserId, newSource);
        } catch {
          set((state) => ({
            incomeSources: state.incomeSources.filter((s) => s.id !== newSource.id),
          }));
        }
      },

      updateIncomeSource: async (id, updates) => {
        const { firebaseService, currentUserId } = get();
        if (!firebaseService || !currentUserId) return;

        const prev = get().incomeSources;
        const updated = prev.map((s) => (s.id === id ? { ...s, ...updates, updatedAt: new Date() } : s));
        set({ incomeSources: updated });

        try {
          const updatedSource = updated.find((s) => s.id === id);
          if (updatedSource) await firebaseService.saveUserIncomeSource(currentUserId, updatedSource);
        } catch {
          set({ incomeSources: prev });
        }
      },

      deleteIncomeSource: async (id) => {
        const { firebaseService, currentUserId } = get();
        if (!firebaseService || !currentUserId) return;

        const prev = get().incomeSources;
        set({ incomeSources: prev.filter((s) => s.id !== id) });

        try {
          await firebaseService.deleteUserIncomeSource(currentUserId, id);
        } catch {
          set({ incomeSources: prev });
        }
      },

      setIncomeSources: (sources) => set({ incomeSources: sources }),
      getIncomeSourceById: (id) => get().incomeSources.find((s) => s.id === id),
      subscribeToIncomeSources: (callback) => {
        const { firebaseService, unsubscribeFunctions } = get();
        if (!firebaseService) return () => {};
        const unsub = firebaseService.subscribeToIncomeSources(callback);
        set({ unsubscribeFunctions: [...unsubscribeFunctions, unsub] });
        return unsub;
      },

      // Expenses
      addExpense: async (expense) => {
        const { firebaseService, currentUserId } = get();
        if (!firebaseService || !currentUserId) return;

        const newExpense: Expense = {
          ...expense,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({ expenses: [...state.expenses, newExpense] }));

        try {
          await firebaseService.saveUserExpense(currentUserId, newExpense);
        } catch {
          set((state) => ({
            expenses: state.expenses.filter((e) => e.id !== newExpense.id),
          }));
        }
      },

      updateExpense: async (id, updates) => {
        const { firebaseService, currentUserId } = get();
        if (!firebaseService || !currentUserId) return;

        const prev = get().expenses;
        const updated = prev.map((e) => (e.id === id ? { ...e, ...updates, updatedAt: new Date() } : e));
        set({ expenses: updated });

        try {
          const updatedExpense = updated.find((e) => e.id === id);
          if (updatedExpense) await firebaseService.saveUserExpense(currentUserId, updatedExpense);
        } catch {
          set({ expenses: prev });
        }
      },

      deleteExpense: async (id) => {
        const { firebaseService, currentUserId } = get();
        if (!firebaseService || !currentUserId) return;

        const prev = get().expenses;
        set({ expenses: prev.filter((e) => e.id !== id) });

        try {
          await firebaseService.deleteUserExpense(currentUserId, id);
        } catch {
          set({ expenses: prev });
        }
      },

      setExpenses: (expenses) => set({ expenses }),
      getExpenseById: (id) => get().expenses.find((e) => e.id === id),
      subscribeToExpenses: (callback) => {
        const { firebaseService, unsubscribeFunctions } = get();
        if (!firebaseService) return () => {};
        const unsub = firebaseService.subscribeToExpenses(callback);
        set({ unsubscribeFunctions: [...unsubscribeFunctions, unsub] });
        return unsub;
      },

      // Goals
      addGoal: async (goal) => {
        const { firebaseService, currentUserId } = get();
        if (!firebaseService || !currentUserId) return;

        const newGoal: Goal = { ...goal, id: Date.now().toString(), createdAt: new Date(), updatedAt: new Date() };
        set((state) => ({ goals: [...state.goals, newGoal] }));

        try {
          await firebaseService.saveUserGoal(currentUserId, newGoal);
        } catch {
          set((state) => ({ goals: state.goals.filter((g) => g.id !== newGoal.id) }));
        }
      },

      updateGoal: async (id, updates) => {
        const { firebaseService, currentUserId } = get();
        if (!firebaseService || !currentUserId) return;

        const prev = get().goals;
        const updated = prev.map((g) => (g.id === id ? { ...g, ...updates, updatedAt: new Date() } : g));
        set({ goals: updated });

        try {
          const updatedGoal = updated.find((g) => g.id === id);
          if (updatedGoal) await firebaseService.saveUserGoal(currentUserId, updatedGoal);
        } catch {
          set({ goals: prev });
        }
      },

      deleteGoal: async (id) => {
        const { firebaseService, currentUserId } = get();
        if (!firebaseService || !currentUserId) return;

        const prev = get().goals;
        set({ goals: prev.filter((g) => g.id !== id) });

        try {
          await firebaseService.deleteUserGoal(currentUserId, id);
        } catch {
          set({ goals: prev });
        }
      },
      setGoals: (goals) => set({ goals }),

      getGoalById: (id) => {
        const { goals } = get();
        return goals.find(goal => goal.id === id);
      },

      subscribeToGoals: (callback) => {
        const { firebaseService, unsubscribeFunctions } = get();
        if (!firebaseService) return () => {};

        const unsubscribe = firebaseService.subscribeToGoals(callback);
        set({ unsubscribeFunctions: [...unsubscribeFunctions, unsubscribe] });
        return unsubscribe;
      },

      // Transactions
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: Date.now().toString() }
          ]
        })),

      setTransactions: (transactions) => set({ transactions }),

      getTransactionById: (id) => {
        const { transactions } = get();
        return transactions.find(transaction => transaction.id === id);
      },

      // UI State
      toggleDarkMode: () =>
        set((state) => ({ darkMode: !state.darkMode })),

      setActiveView: (view) =>
        set({ activeView: view }),

      // Sync methods
      syncWithFirebase: async () => {
        const { currentUserId } = get();
        if (!currentUserId) return;

        await get().loadUserData(currentUserId);
      }
    }),
    {
      name: 'financial-store',
      partialize: (state) => ({
        darkMode: state.darkMode,
        activeView: state.activeView,
        currentUserId: state.currentUserId,
      }),
    }
  )
);