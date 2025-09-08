import React from 'react'
import { motion } from 'framer-motion'
import { User, Edit, Wallet, Target, TrendingUp } from 'lucide-react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'

export const Profile: React.FC = () => {
  const [user] = useAuthState(auth)

  return (
    <div className="p-4 pb-20 space-y-6">
      <Card>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-20 h-20 rounded-2xl object-cover"
              />
            ) : (
              <User size={36} className="text-white" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {user?.displayName || 'Usuário'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Conta desde {new Date(user?.metadata.creationTime || '').toLocaleDateString('pt-BR')}
            </p>
          </div>
          <Button variant="ghost" icon={Edit} onClick={() => {}} />
        </div>
      </Card>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Informações Financeiras
        </h3>
        <Card className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
              <Wallet className="text-primary-600 dark:text-primary-400" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">Salário Mensal</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">R$ 1.700,00</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-secondary-100 dark:bg-secondary-900/30 rounded-xl flex items-center justify-center">
              <Target className="text-secondary-600 dark:text-secondary-400" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">Meta de Poupança</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">R$ 500,00 por mês</p>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">Progresso</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">75% da meta atingida</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
