/* eslint-disable func-style */
import React, { createContext, useEffect, useState, useContext } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  FacebookAuthProvider,
  signInWithPopup
} from 'firebase/auth';

import { auth } from '../firebase';

import axios from 'axios';

const userAuthContext = createContext();

// eslint-disable-next-line func-style
//wrap all context in the component below, extracting code from app.jsx
//wrapping all of the logic of handling state, updating state and pushing out these values to the child components
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState('initial value');

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  }

  function logOut() {
    return signOut(auth);
  }

  function registerUser(firstName, lastName, email) {
    let bodyParam = {firstName, lastName, email};
    axios.post('/auth', bodyParam)
      .then((res) => {
        if (res.data !== '') {
          console.log('post res should return userId for new user', res.data.user_id);
        }
        console.log('succesful post request to users table');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function getUserId(email) {
    axios.get('/auth', {
      params: {
        email: email
      }
    })
      .then((res) => {
        //method1: use localstorage to save userId for current session instead of using state(async)
        window.localStorage.setItem('currentId', res.data.user_id);
        //method2: use state to preserve userInfo (left here to avoid breaking other components)
        const newUserId = res.data.user_id;
        setUserId(newUserId);
      })
      .catch((err) => {
        console.log('err getting user id', err.message);
      });
  }

  //run only once, when the components did mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        getUserId(currentUser.email);
      }
    });
    return () => {
      //clean up while components un-mount
      unsubscribe();
    };
  }, []);


  return (
    <userAuthContext.Provider value={{user, userId, signUp, logIn, facebookSignIn, logOut, registerUser}}>
      {children}
    </userAuthContext.Provider>
  );
}

//custom hook, to access userAuthcontext outside our context file
// eslint-disable-next-line func-style
export function useUserAuth() {
  return useContext(userAuthContext);
}