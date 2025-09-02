import React from 'react';
import { motion } from 'framer-motion';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import { Button } from '../ui/Button';
import { DollarSign, Shield, TrendingUp, Target, Lightbulb, CreditCard } from 'lucide-react';
import Logo from "@/assets/logo.png"
export const LoginScreen: React.FC = () => {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

const features = [
  {
    icon: DollarSign,
    title: "Dashboard Inteligente",
    description:
      "Visão 360º da sua saúde financeira, saldo atualizado, score financeiro, próximos vencimentos"
  },
  {
    icon: TrendingUp,
    title: "Projeções de Futuro",
    description:
      "Acompanhe o crescimento do seu património, calcule poupança futura com base em salário e despesas"
  },
  {
    icon: Lightbulb,
    title: "Assistente Proativo",
    description:
      "Receba insights inteligentes, dicas de economia, identifique onde pode poupar mais"
  },
  {
    icon: Target,
    title: "Controle de Gastos e Dívidas",
    description:
      "Crie categorias, organize despesas recorrentes, acompanhe parcelas e mantenha o orçamento sob controle"
  }
]

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo and Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 overflow-hidden">
          <img src={Logo} alt="CLT" className="w-full h-full object-cover" />
        </div>
          
        </motion.div>

        {/* Features */}
        <motion.div
          className="space-y-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <div className="p-2 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Icon size={30} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Button
            onClick={handleGoogleSignIn}
            variant="primary"
            fullWidth
            className="h-14 text-lg bg-green-600 text-gray-900 hover:bg-gray-100 shadow-xl"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Entrar com Google
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-white/60 text-sm">
            Ao continuar, você concorda com nossos{' '}
            <span className="underline">Termos de Uso</span> e{' '}
            <span className="underline">Política de Privacidade</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};