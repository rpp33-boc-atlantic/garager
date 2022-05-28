/* eslint-disable func-style */
import React, { createContext, useEffect, useState, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

import { auth } from '../firebase';

const userAuthContext = createContext();

// eslint-disable-next-line func-style
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  //run only once, when the components did mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('userAuth', currentUser);
      setUser(currentUser);
    });
    return () => {
      //clean up while components un-mount
      unsubscribe();
    };

  }, []);

  return (
    <userAuthContext.Provider value={{user, signUp, logIn}}>
      {children}
    </userAuthContext.Provider>
  );
}

// eslint-disable-next-line func-style
export function useUserAuth() {
  return useContext(userAuthContext);
}