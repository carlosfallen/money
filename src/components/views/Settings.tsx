import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  Upload,
  Trash2,
  LogOut,
  Moon,
  Sun,
  Globe,
  CreditCard,
  HelpCircle,
  Mail,
  Smartphone,
  AlertTriangle
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useFinancialStore } from '../../store/useFinancialStore';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface SettingItem {
  icon: typeof User;
  title: string;
  description: string;
  action: () => void;
  toggle?: boolean;
  value?: boolean;
  danger?: boolean;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

export const Settings: React.FC = () => {
  const { darkMode, toggleDarkMode } = useFinancialStore();
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState({
    expenses: true,
    goals: true,
    income: false,
    reports: true
  });

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleExportData = () => {
    console.log('Exportando dados...');
  };

  const handleImportData = () => {
    console.log('Importando dados...');
  };

  const settingSections: SettingSection[] = [
    {
      title: 'Conta',
      items: [
        {
          icon: User,
          title: 'Perfil',
          description: 'Gerencie suas informações pessoais',
          action: () => {}
        },
        {
          icon: Shield,
          title: 'Privacidade e Segurança',
          description: 'Configurações de segurança da conta',
          action: () => {}
        },
        {
          icon: LogOut,
          title: 'Sair da Conta',
          description: 'Fazer logout do aplicativo',
          action: handleSignOut,
          danger: true
        }
      ]
    },
    {
      title: 'Aparência',
      items: [
        {
          icon: darkMode ? Sun : Moon,
          title: 'Tema',
          description: darkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro',
          action: toggleDarkMode,
          toggle: true,
          value: darkMode
        },
        {
          icon: Palette,
          title: 'Personalização',
          description: 'Cores e layout do aplicativo',
          action: () => {}
        },
        {
          icon: Globe,
          title: 'Idioma',
          description: 'Português (Brasil)',
          action: () => {}
        }
      ]
    },
    {
      title: 'Notificações',
      items: [
        {
          icon: Bell,
          title: 'Lembretes de Gastos',
          description: 'Notificações sobre novos gastos',
          toggle: true,
          value: notifications.expenses,
          action: () => setNotifications(prev => ({ ...prev, expenses: !prev.expenses }))
        },
        {
          icon: Bell,
          title: 'Progresso de Metas',
          description: 'Atualizações sobre suas metas',
          toggle: true,
          value: notifications.goals,
          action: () => setNotifications(prev => ({ ...prev, goals: !prev.goals }))
        },
        {
          icon: Bell,
          title: 'Receitas Pendentes',
          description: 'Lembretes de receitas a receber',
          toggle: true,
          value: notifications.income,
          action: () => setNotifications(prev => ({ ...prev, income: !prev.income }))
        },
        {
          icon: Bell,
          title: 'Relatórios Mensais',
          description: 'Resumo mensal das finanças',
          toggle: true,
          value: notifications.reports,
          action: () => setNotifications(prev => ({ ...prev, reports: !prev.reports }))
        }
      ]
    },
    {
      title: 'Dados',
      items: [
        {
          icon: Download,
          title: 'Exportar Dados',
          description: 'Baixar backup dos seus dados',
          action: handleExportData
        },
        {
          icon: Upload,
          title: 'Importar Dados',
          description: 'Restaurar dados de um backup',
          action: handleImportData
        },
        {
          icon: Trash2,
          title: 'Limpar Dados',
          description: 'Remover todos os dados locais',
          action: () => {},
          danger: true
        }
      ]
    },
    {
      title: 'Suporte',
      items: [
        {
          icon: HelpCircle,
          title: 'Central de Ajuda',
          description: 'Perguntas frequentes e tutoriais',
          action: () => {}
        },
        {
          icon: Mail,
          title: 'Contato',
          description: 'Entre em contato conosco',
          action: () => {}
        },
        {
          icon: Smartphone,
          title: 'Sobre o App',
          description: 'Versão 1.0.0 - Finanças Pro',
          action: () => {}
        }
      ]
    }
  ];

  return (
    <div className="p-4 pb-20 space-y-6">
      {user && (
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || 'User'} 
                  className="w-16 h-16 rounded-2xl object-cover"
                />
              ) : (
                <User size={32} className="text-white" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {user.displayName || 'Usuário'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {user.email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Membro desde {new Date(user.metadata.creationTime || '').toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </Card>
      )}

      {settingSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {section.title}
          </h3>
          <Card className="p-0 overflow-hidden">
            {section.items.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={index}
                  onClick={item.action}
                  className={`w-full p-4 flex items-center gap-4 text-left transition-colors ${
                    index !== section.items.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                  } ${
                    item.danger 
                      ? 'hover:bg-error-50 dark:hover:bg-error-900/10' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.danger 
                      ? 'bg-error-100 dark:bg-error-900/20' 
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}>
                    <Icon 
                      size={20} 
                      className={item.danger ? 'text-error-600' : 'text-gray-600 dark:text-gray-400'} 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      item.danger 
                        ? 'text-error-600' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                  {item.toggle && item.value !== undefined && (
                    <div className={`w-12 h-6 rounded-full transition-colors ${
                      item.value ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <motion.div
                        className="w-5 h-5 bg-white rounded-full shadow-sm mt-0.5"
                        animate={{ x: item.value ? 26 : 2 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </Card>
        </motion.div>
      ))}

      <Card className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CreditCard size={32} className="text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Finanças Pro
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Versão 1.0.0
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Desenvolvido com ❤️ para ajudar você a ter controle total das suas finanças
        </p>
      </Card>

      <Card className="border-2 border-error-200 dark:border-error-800 bg-error-50 dark:bg-error-900/10">
        <div className="text-center">
          <AlertTriangle size={32} className="mx-auto mb-4 text-error-500" />
          <h3 className="text-lg font-semibold text-error-800 dark:text-error-400 mb-2">
            Zona de Perigo
          </h3>
          <p className="text-error-600 dark:text-error-400 text-sm mb-4">
            Ações irreversíveis que afetam permanentemente seus dados
          </p>
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => {}}
              className="w-full border-error-300 text-error-600 hover:bg-error-100 dark:border-error-700 dark:text-error-400 dark:hover:bg-error-900/20"
            >
              Resetar Todas as Configurações
            </Button>
            <Button
              variant="outline"
              onClick={() => {}}
              className="w-full border-error-300 text-error-600 hover:bg-error-100 dark:border-error-700 dark:text-error-400 dark:hover:bg-error-900/20"
            >
              Excluir Conta Permanentemente
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};