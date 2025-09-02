import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  onSnapshot,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { IncomeSource, Expense, Goal, ServiceAppointment } from '../types';

export class FirebaseService {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  // Income Sources
  async saveIncomeSource(incomeSource: IncomeSource) {
    const docRef = doc(db, 'users', this.userId, 'incomeSources', incomeSource.id);
    await setDoc(docRef, {
      ...incomeSource,
      updatedAt: Timestamp.now()
    });
  }

  async getIncomeSources(): Promise<IncomeSource[]> {
    const q = query(collection(db, 'users', this.userId, 'incomeSources'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as IncomeSource);
  }

  async deleteIncomeSource(id: string) {
    await deleteDoc(doc(db, 'users', this.userId, 'incomeSources', id));
  }

  // Expenses
  async saveExpense(expense: Expense) {
    const docRef = doc(db, 'users', this.userId, 'expenses', expense.id);
    await setDoc(docRef, {
      ...expense,
      updatedAt: Timestamp.now()
    });
  }

  async getExpenses(): Promise<Expense[]> {
    const q = query(
      collection(db, 'users', this.userId, 'expenses'),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Expense);
  }

  async deleteExpense(id: string) {
    await deleteDoc(doc(db, 'users', this.userId, 'expenses', id));
  }

  // Goals
  async saveGoal(goal: Goal) {
    const docRef = doc(db, 'users', this.userId, 'goals', goal.id);
    await setDoc(docRef, {
      ...goal,
      updatedAt: Timestamp.now()
    });
  }

  async getGoals(): Promise<Goal[]> {
    const q = query(collection(db, 'users', this.userId, 'goals'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as Goal);
  }

  async deleteGoal(id: string) {
    await deleteDoc(doc(db, 'users', this.userId, 'goals', id));
  }

  // Service Appointments
  async saveServiceAppointment(appointment: ServiceAppointment) {
    const docRef = doc(db, 'users', this.userId, 'serviceAppointments', appointment.id);
    await setDoc(docRef, {
      ...appointment,
      updatedAt: Timestamp.now()
    });
  }

  async getServiceAppointments(): Promise<ServiceAppointment[]> {
    const q = query(
      collection(db, 'users', this.userId, 'serviceAppointments'),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as ServiceAppointment);
  }

  async deleteServiceAppointment(id: string) {
    await deleteDoc(doc(db, 'users', this.userId, 'serviceAppointments', id));
  }

  // User Profile
  async saveUserProfile(profile: any) {
    const docRef = doc(db, 'users', this.userId);
    await setDoc(docRef, {
      ...profile,
      updatedAt: Timestamp.now()
    }, { merge: true });
  }

  async getUserProfile() {
    const docRef = doc(db, 'users', this.userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }

  // Real-time listeners
  subscribeToIncomeSources(callback: (sources: IncomeSource[]) => void) {
    const q = query(collection(db, 'users', this.userId, 'incomeSources'));
    return onSnapshot(q, (querySnapshot) => {
      const sources = querySnapshot.docs.map(doc => doc.data() as IncomeSource);
      callback(sources);
    });
  }

  subscribeToExpenses(callback: (expenses: Expense[]) => void) {
    const q = query(
      collection(db, 'users', this.userId, 'expenses'),
      orderBy('date', 'desc')
    );
    return onSnapshot(q, (querySnapshot) => {
      const expenses = querySnapshot.docs.map(doc => doc.data() as Expense);
      callback(expenses);
    });
  }

  subscribeToGoals(callback: (goals: Goal[]) => void) {
    const q = query(collection(db, 'users', this.userId, 'goals'));
    return onSnapshot(q, (querySnapshot) => {
      const goals = querySnapshot.docs.map(doc => doc.data() as Goal);
      callback(goals);
    });
  }
}