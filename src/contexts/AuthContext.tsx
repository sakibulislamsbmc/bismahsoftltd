import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (phone: string, pass: string) => Promise<void>;
  signup: (name: string, phone: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatPhoneToEmail = (phone: string) => {
    let normalized = phone.replace(/[^0-9+]/g, '');
    if (normalized.startsWith('01')) normalized = '+88' + normalized;
    if (normalized.startsWith('8801')) normalized = '+' + normalized;
    return `${normalized}@bismahsoft.local`;
  };

  const login = async (phone: string, pass: string) => {
    try {
      setLoading(true);
      const email = formatPhoneToEmail(phone);
      await signInWithEmailAndPassword(auth, email, pass);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, phone: string, pass: string) => {
    try {
      setLoading(true);
      const email = formatPhoneToEmail(phone);
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        email: email,
        phone: phone,
        displayName: name,
        photoURL: '',
        createdAt: new Date().toISOString(),
        role: 'user'
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
      throw error;
    }
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthModalOpen, openAuthModal, closeAuthModal }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
