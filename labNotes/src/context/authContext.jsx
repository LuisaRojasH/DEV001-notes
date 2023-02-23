import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig'

const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error('There is not auth provider')
  return context
}

// eslint-disable-next-line react/prop-types
export function AuthProvaider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => signOut(auth)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log({ currentUser });
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signUp,
        logIn,
        user,
        logOut,
        loading,
        loginWithGoogle,
      }}
    >
      {children}
    </authContext.Provider>
  );
}