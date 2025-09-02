import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';
import { FirebaseService } from './services/firebaseService';
import { LoginScreen } from './components/auth/LoginScreen';
import { Header } from './components/layout/Header';
import { NavigationBar } from './components/layout/NavigationBar';
import { Dashboard } from './components/views/Dashboard';
import { Income } from './components/views/Income';
import { Expenses } from './components/views/Expenses';
import { Goals } from './components/views/Goals';
import { Analytics } from './components/views/Analytics';
import { Calendar } from './components/views/Calendar';
import { Settings } from './components/views/Settings';
import { useFinancialStore } from './store/useFinancialStore';

const views = {
  dashboard: Dashboard,
  income: Income,
  expenses: Expenses,
  analytics: Analytics,
  goals: Goals,
  calendar: Calendar,
  settings: Settings,
};

function App() {
  const [user, loading] = useAuthState(auth);
  const { activeView, darkMode, setFirebaseService, syncWithFirebase } = useFinancialStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (user) {
      const firebaseService = new FirebaseService(user.uid);
      setFirebaseService(firebaseService);
      
      // Sync data with Firebase
      syncWithFirebase();

      // Set up real-time listeners
      const unsubscribeIncome = firebaseService.subscribeToIncomeSources((sources) => {
        useFinancialStore.getState().setIncomeSources(sources);
      });

      const unsubscribeExpenses = firebaseService.subscribeToExpenses((expenses) => {
        useFinancialStore.getState().setExpenses(expenses);
      });

      const unsubscribeGoals = firebaseService.subscribeToGoals((goals) => {
        useFinancialStore.getState().setGoals(goals);
      });

      return () => {
        unsubscribeIncome();
        unsubscribeExpenses();
        unsubscribeGoals();
      };
    } else {
      setFirebaseService(null);
    }
  }, [user, setFirebaseService, syncWithFirebase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  const CurrentView = views[activeView as keyof typeof views] || Dashboard;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <CurrentView />
          </motion.div>
        </AnimatePresence>
      </main>

      <NavigationBar />
    </div>
  );
}

export default App;