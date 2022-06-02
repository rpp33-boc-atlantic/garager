/* eslint-disable func-style */
import React, { createContext, useEffect, useState, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential
} from 'firebase/auth';

import { auth } from '../firebase';


const userAuthContext = createContext();

// eslint-disable-next-line func-style
//wrap all context in the component below, extracting code from app.jsx
//wrapping all of the logic of handling state, updating state and pushing out these values to the child components
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [cred, setCred] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
    //TODO: if user email already exists through facebook login,
    //pop up error message and guide the user to login page
  }

  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        //user tries to sign in with with an existing email account
        console.log(err.message);
        if (err.code === 'auth/account-exists-with-different-credential') {
          const pendingCred = FacebookAuthProvider.credentialFromError(err);
          setCred(pendingCred);
          console.log('cred', cred);
          console.log('pendingCred', FacebookAuthProvider.credentialFromError(err));
          //TODO: Ask the user for their email and password.
          let email = prompt('Please enter your registered email');
          let password = prompt('Please enter your password');
          linkAccount(email, password, pendingCred);
        }
      });
  }

  function logOut() {
    return signOut(auth);
  }


  const linkAccount = (email, password, pendingCred) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        linkWithCredential(res.user, pendingCred)
          .then((res) => {
            console.log('succesfully linked account');
          })
          .catch((err) => {
            console.log('failed to link account', err.message);
            //TODO: GOTO APP
          });
      }).catch ((err) => {
        console.log('failed to sign in with email and password', err.message);
      });

  };

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
    <userAuthContext.Provider value={{user, signUp, logIn, facebookSignIn, logOut}}>
      {children}
    </userAuthContext.Provider>
  );
}

//custom hook, to access userAuthcontext outside our context file
// eslint-disable-next-line func-style
export function useUserAuth() {
  return useContext(userAuthContext);
}