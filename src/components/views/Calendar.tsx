import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Clock, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useFinancialStore } from '../../store/useFinancialStore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const Calendar: React.FC = () => {
  const { serviceAppointments, addServiceAppointment, updateServiceAppointment, deleteServiceAppointment } = useFinancialStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '09:00',
    estimatedCost: '',
    category: '',
    description: ''
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handleAddAppointment = () => {
    if (newAppointment.title && newAppointment.date) {
      addServiceAppointment({
        title: newAppointment.title,
        date: `${newAppointment.date}T${newAppointment.time}`,
        estimatedCost: parseFloat(newAppointment.estimatedCost) || 0,
        status: 'scheduled',
        category: newAppointment.category || 'Geral',
        description: newAppointment.description
      });
      setNewAppointment({
        title: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '09:00',
        estimatedCost: '',
        category: '',
        description: ''
      });
      setShowAddForm(false);
    }
  };

  const getAppointmentsForDate = (date: Date) => {
    return serviceAppointments.filter(appointment => 
      isSameDay(new Date(appointment.date), date)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-400';
      case 'in-progress':
        return 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-400';
      default:
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-success-500" />;
      case 'in-progress':
        return <Clock size={16} className="text-warning-500" />;
      default:
        return <AlertCircle size={16} className="text-primary-500" />;
    }
  };

  const selectedDateAppointments = getAppointmentsForDate(selectedDate);

  return (
    <div className="px-4 pb-20 space-y-6">
      {/* Calendar Navigation */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h3>
          <button
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysInMonth.map((day) => {
            const appointments = getAppointmentsForDate(day);
            const isSelected = isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());
            
            return (
              <motion.button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`p-2 text-sm rounded-lg transition-all relative ${
                  isSelected
                    ? 'bg-primary-500 text-white'
                    : isToday
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400'
                    : isSameMonth(day, currentDate)
                    ? 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-gray-400 dark:text-gray-600'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {format(day, 'd')}
                {appointments.length > 0 && (
                  <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-primary-500'
                  }`} />
                )}
              </motion.button>
            );
          })}
        </div>
      </Card>

      {/* Add Appointment Button */}
      <Button
        variant="primary"
        icon={Plus}
        onClick={() => setShowAddForm(true)}
        fullWidth
        className="h-12"
      >
        Agendar Compromisso
      </Button>

      {/* Add Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Novo Compromisso
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Título
                  </label>
                  <input
                    type="text"
                    value={newAppointment.title}
                    onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Ex: Consulta médica, Revisão do carro..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Data
                    </label>
                    <input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Horário
                    </label>
                    <input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Custo Estimado (R$)
                  </label>
                  <input
                    type="number"
                    value={newAppointment.estimatedCost}
                    onChange={(e) => setNewAppointment({ ...newAppointment, estimatedCost: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="0,00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={newAppointment.category}
                    onChange={(e) => setNewAppointment({ ...newAppointment, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Ex: Saúde, Carro, Casa..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descrição (opcional)
                  </label>
                  <textarea
                    value={newAppointment.description}
                    onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                    placeholder="Detalhes adicionais..."
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  fullWidth
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleAddAppointment}
                  fullWidth
                >
                  Agendar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Date Appointments */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
        </h3>
        
        {selectedDateAppointments.length > 0 ? (
          <div className="space-y-3">
            {selectedDateAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {appointment.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status === 'scheduled' ? 'Agendado' : 
                         appointment.status === 'in-progress' ? 'Em andamento' : 'Concluído'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {format(new Date(appointment.date), 'HH:mm')}
                      </div>
                      {appointment.estimatedCost > 0 && (
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} />
                          R$ {appointment.estimatedCost.toLocaleString('pt-BR')}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {appointment.category}
                    </p>
                    {appointment.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {appointment.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {getStatusIcon(appointment.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Edit}
                      onClick={() => {}}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      onClick={() => deleteServiceAppointment(appointment.id)}
                      className="text-error-500 hover:bg-error-50 dark:hover:bg-error-900/20"
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateServiceAppointment(appointment.id, {
                      status: appointment.status === 'completed' ? 'scheduled' : 'completed'
                    })}
                    className="flex-1"
                  >
                    {appointment.status === 'completed' ? 'Marcar como Pendente' : 'Marcar como Concluído'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CalendarIcon size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 dark:text-gray-400">
              Nenhum compromisso agendado para este dia
            </p>
          </div>
        )}
      </Card>

      {/* Upcoming Appointments */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Próximos Compromissos
        </h3>
        <div className="space-y-3">
          {serviceAppointments
            .filter(appointment => new Date(appointment.date) > new Date())
            .slice(0, 3)
            .map((appointment, index) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {appointment.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(appointment.date), "d 'de' MMM 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    R$ {appointment.estimatedCost.toLocaleString('pt-BR')}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status === 'scheduled' ? 'Agendado' : 
                     appointment.status === 'in-progress' ? 'Em andamento' : 'Concluído'}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};