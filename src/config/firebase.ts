import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDULf3XSwiiFQZ7q_M9YNieDbWZNLnO7Nw",
  authDomain: "myapp-415315.firebaseapp.com",
  databaseURL: "https://myapp-415315-default-rtdb.firebaseio.com",
  projectId: "myapp-415315",
  storageBucket: "myapp-415315.appspot.com",
  messagingSenderId: "103002319588",
  appId: "1:103002319588:web:02e80d91e1a0ef974e1af1",
  measurementId: "G-SVBSYH3E85"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

setPersistence(auth, browserLocalPersistence).catch(err => {
  console.warn('Não foi possível setar persistence:', err);
});

export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;