import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  Timestamp
} from 'firebase/firestore'
import { db } from '../config/firebase'
import type { IncomeSource, Expense, Goal, User } from '../types'

export class FirebaseService {
  private userId: string

  constructor(userId: string) {
    this.userId = userId
  }

  // Método para buscar todos os dados de uma vez
  async getAllUserData() {
    const [income, expenses, goals] = await Promise.all([
      this.getUserIncomeSources(this.userId),
      this.getUserExpenses(this.userId),
      this.getUserGoals(this.userId)
    ])
    
    return { income, expenses, goals }
  }

  // User Data
  async getUserData(userId: string): Promise<User | undefined> {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return undefined;
    return docSnap.data() as User;
  }

  async saveUser(userId: string, userData: User): Promise<void> {
    const ref = doc(db, 'users', userId);
    await setDoc(ref, {
      ...userData,
      updatedAt: Timestamp.now()
    });
  }

  // Income Sources - Métodos individuais (compatibilidade)
  async saveIncomeSource(data: IncomeSource): Promise<void> {
    const ref = doc(db, 'users', this.userId, 'incomeSources', data.id)
    await setDoc(ref, {
      ...data,
      createdAt: data.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now()
    })
  }

  async getIncomeSources(): Promise<IncomeSource[]> {
    const q = query(collection(db, 'users', this.userId, 'incomeSources'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ ...(d.data() as IncomeSource), id: d.id }))
  }

  async getIncomeSourceById(id: string): Promise<IncomeSource | null> {
    const ref = doc(db, 'users', this.userId, 'incomeSources', id)
    const snap = await getDoc(ref)
    return snap.exists() ? ({ ...(snap.data() as IncomeSource), id: snap.id }) : null
  }

  async updateIncomeSource(id: string, data: Partial<IncomeSource>): Promise<void> {
    const ref = doc(db, 'users', this.userId, 'incomeSources', id)
    await updateDoc(ref, { ...data, updatedAt: Timestamp.now() })
  }

  async deleteIncomeSource(id: string): Promise<void> {
    const ref = doc(db, 'users', this.userId, 'incomeSources', id)
    await deleteDoc(ref)
  }

  subscribeToIncomeSources(callback: (data: IncomeSource[]) => void) {
    const q = query(collection(db, 'users', this.userId, 'incomeSources'))
    return onSnapshot(q, snap => {
      const items = snap.docs.map(d => ({ ...(d.data() as IncomeSource), id: d.id }))
      callback(items)
    })
  }

  // Income Sources - Métodos com userId (para o store)
  async getUserIncomeSources(userId: string): Promise<IncomeSource[]> {
    const q = query(collection(db, 'users', userId, 'incomeSources'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ ...(d.data() as IncomeSource), id: d.id }))
  }

  async saveUserIncomeSource(userId: string, data: IncomeSource): Promise<void> {
    const ref = doc(db, 'users', userId, 'incomeSources', data.id)
    await setDoc(ref, {
      ...data,
      createdAt: data.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now()
    })
  }

  async deleteUserIncomeSource(userId: string, id: string): Promise<void> {
    const ref = doc(db, 'users', userId, 'incomeSources', id)
    await deleteDoc(ref)
  }

  // Expenses - Métodos individuais (compatibilidade)
  async saveExpense(data: Expense): Promise<void> {
    const ref = doc(db, 'users', this.userId, 'expenses', data.id)
    await setDoc(ref, {
      ...data,
      createdAt: data.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now()
    })
  }

  async getExpenses(): Promise<Expense[]> {
    const q = query(collection(db, 'users', this.userId, 'expenses'), orderBy('date', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ ...(d.data() as Expense), id: d.id }))
  }

  async getExpenseById(id: string): Promise<Expense | null> {
    const ref = doc(db, 'users', this.userId, 'expenses', id)
    const snap = await getDoc(ref)
    return snap.exists() ? ({ ...(snap.data() as Expense), id: snap.id }) : null
  }

  async updateExpense(id: string, data: Partial<Expense>): Promise<void> {
    const ref = doc(db, 'users', this.userId, 'expenses', id)
    await updateDoc(ref, { ...data, updatedAt: Timestamp.now() })
  }

  async deleteExpense(id: string): Promise<void> {
    const ref = doc(db, 'users', this.userId, 'expenses', id)
    await deleteDoc(ref)
  }

  subscribeToExpenses(callback: (data: Expense[]) => void) {
    const q = query(collection(db, 'users', this.userId, 'expenses'), orderBy('date', 'desc'))
    return onSnapshot(q, snap => {
      const items = snap.docs.map(d => ({ ...(d.data() as Expense), id: d.id }))
      callback(items)
    })
  }

  // Expenses - Métodos com userId (para o store)
  async getUserExpenses(userId: string): Promise<Expense[]> {
    const q = query(collection(db, 'users', userId, 'expenses'), orderBy('date', 'desc'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ ...(d.data() as Expense), id: d.id }))
  }

  async saveUserExpense(userId: string, data: Expense): Promise<void> {
    const ref = doc(db, 'users', userId, 'expenses', data.id)
    await setDoc(ref, {
      ...data,
      createdAt: data.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now()
    })
  }

  async deleteUserExpense(userId: string, id: string): Promise<void> {
    const ref = doc(db, 'users', userId, 'expenses', id)
    await deleteDoc(ref)
  }

  // Goals - Métodos individuais (compatibilidade)
  async saveGoal(data: Goal): Promise<void> {
    const ref = doc(db, 'users', this.userId, 'goals', data.id)
    await setDoc(ref, {
      ...data,
      createdAt: data.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now()
    })
  }

  async getGoals(): Promise<Goal[]> {
    const q = query(collection(db, 'users', this.userId, 'goals'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ ...(d.data() as Goal), id: d.id }))
  }

  async getGoalById(id: string): Promise<Goal | null> {
    const ref = doc(db, 'users', this.userId, 'goals', id)
    const snap = await getDoc(ref)
    return snap.exists() ? ({ ...(snap.data() as Goal), id: snap.id }) : null
  }

  async updateGoal(id: string, data: Partial<Goal>): Promise<void> {
    const ref = doc(db, 'users', this.userId, 'goals', id)
    await updateDoc(ref, { ...data, updatedAt: Timestamp.now() })
  }

  async deleteGoal(id: string): Promise<void> {
    const ref = doc(db, 'users', this.userId, 'goals', id)
    await deleteDoc(ref)
  }

  subscribeToGoals(callback: (data: Goal[]) => void) {
    const q = query(collection(db, 'users', this.userId, 'goals'))
    return onSnapshot(q, snap => {
      const items = snap.docs.map(d => ({ ...(d.data() as Goal), id: d.id }))
      callback(items)
    })
  }

  // Goals - Métodos com userId (para o store)
  async getUserGoals(userId: string): Promise<Goal[]> {
    const q = query(collection(db, 'users', userId, 'goals'))
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ ...(d.data() as Goal), id: d.id }))
  }

  async saveUserGoal(userId: string, data: Goal): Promise<void> {
    const ref = doc(db, 'users', userId, 'goals', data.id)
    await setDoc(ref, {
      ...data,
      createdAt: data.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now()
    })
  }

  async deleteUserGoal(userId: string, id: string): Promise<void> {
    const ref = doc(db, 'users', userId, 'goals', id)
    await deleteDoc(ref)
  }
}