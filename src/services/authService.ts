import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

export class AuthService {
  static getAuthInstance() {
    return auth;
  }

  static async signInWithGoogle(): Promise<User> {
    try {
      console.log('Iniciando login com Google via popup...');
      console.log('Current URL:', window.location.href);
      console.log('Auth domain:', auth.app.options.authDomain);
      
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Login com popup bem-sucedido:', result.user.uid);
      return result.user;
      
    } catch (error: any) {
      console.error('Erro no login com Google:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw error;
    }
  }

  static async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      console.log('Tentando login com email:', email);
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login bem-sucedido:', result.user.uid);
      return result.user;
    } catch (error: any) {
      console.error('Erro no login com email:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw error;
    }
  }

  static async signUpWithEmail(email: string, password: string): Promise<User> {
    try {
      console.log('Tentando cadastro com email:', email);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Cadastro bem-sucedido:', result.user.uid);
      return result.user;
    } catch (error: any) {
      console.error('Erro no cadastro com email:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      throw error;
    }
  }

  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }

  static getCurrentUser(): User | null {
    return auth.currentUser;
  }

  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Erro no logout:', error);
      throw error;
    }
  }
}