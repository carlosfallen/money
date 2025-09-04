import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthService } from './services/authService';
import LoginScreen from './components/auth/LoginScreen';
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
import { FirebaseService } from './services/firebaseService';

const views = {
  dashboard: Dashboard,
  income: Income,
  expenses: Expenses,
  analytics: Analytics,
  goals: Goals,
  calendar: Calendar,
  settings: Settings,
} as const;

type ViewKeys = keyof typeof views;

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { activeView, darkMode, firebaseService, currentUserId } = useFinancialStore(
    (state) => ({
      activeView: state.activeView,
      darkMode: state.darkMode,
      firebaseService: state.firebaseService,
      currentUserId: state.currentUserId,
    })
  );

  // Configura FirebaseService e currentUserId apenas uma vez
  useEffect(() => {
    if (!user) return;

    const store = useFinancialStore.getState();
    if (!store.firebaseService) {
      const service = new FirebaseService(user.uid);
      store.setFirebaseService(service);
      store.setCurrentUserId(user.uid);
    }
  }, [user]);

  // Carrega dados do usuário apenas uma vez quando firebaseService e currentUserId estiverem prontos
  useEffect(() => {
    if (!firebaseService || !currentUserId) return;

    let canceled = false;

    const loadData = async () => {
      console.log("Tentando carregar dados do usuário...");
      try {
        await useFinancialStore.getState().loadUserData(currentUserId);
        if (!canceled) console.log("Dados carregados");
      } catch (err) {
        console.error(err);
      }
    };

    loadData();

    return () => {
      canceled = true;
    };
  }, [firebaseService, currentUserId]);

  // Atualiza classe dark no html
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Auth listener
  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <motion.div
            className="w-16 h-16 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-400">
            Carregando aplicação...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <LoginScreen
        onAuthSuccess={(userData: User) => {
          setUser(userData);
        }}
      />
    );
  }

  const CurrentView = views[activeView as ViewKeys] || Dashboard;

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
