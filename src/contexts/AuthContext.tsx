import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  userRole: 'user' | 'admin' | 'superadmin' | null;
  loading: boolean;
  login: (username: string, pass: string) => Promise<void>;
  signup: (name: string, username: string, pass: string) => Promise<void>;
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
  const [userRole, setUserRole] = useState<'user' | 'admin' | 'superadmin' | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const userRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserRole(data.role || 'user');
      } else {
        setUserRole('user');
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching user role:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const formatUsernameToEmail = (username: string) => {
    // If it looks like a phone number from the old system, format it to match the old email format
    const isPhone = /^[0-9+]+$/.test(username);
    if (isPhone) {
      let normalized = username.replace(/[^0-9+]/g, '');
      if (normalized.startsWith('01')) normalized = '+88' + normalized;
      if (normalized.startsWith('8801')) normalized = '+' + normalized;
      return `${normalized}@bismahsoft.local`;
    }
    // Otherwise, treat it as a regular username
    const normalizedUsername = username.toLowerCase().replace(/[^a-z0-9_.-]/g, '');
    return `${normalizedUsername}@bismahsoft.local`;
  };

  const login = async (username: string, pass: string) => {
    try {
      setLoading(true);
      const email = formatUsernameToEmail(username);
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signup = async (name: string, username: string, pass: string) => {
    try {
      setLoading(true);
      const email = formatUsernameToEmail(username);
      const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
      
      const userRef = doc(db, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        uid: userCredential.user.uid,
        email: email,
        username: username,
        displayName: name,
        photoURL: '',
        createdAt: new Date().toISOString(),
        role: 'user'
      });
    } catch (error) {
      setLoading(false);
      throw error;
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
    <AuthContext.Provider value={{ user, userRole, loading, login, signup, logout, isAuthModalOpen, openAuthModal, closeAuthModal }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
