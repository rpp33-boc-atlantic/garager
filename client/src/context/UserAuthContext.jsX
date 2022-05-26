import { createContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

const userAuthContext = createContext();

// eslint-disable-next-line func-style
export function UserAuthContextProvider ({ children }) {
  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  );
}

// eslint-disable-next-line func-style
export function useUserAuth() {
  return useContext(userAuthContext);
}