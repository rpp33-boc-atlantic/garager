/* eslint-disable func-style */
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const mainContext = createContext();

export function MainContextProvider({ children }) {
  const [userId, setUserId] = useState('');

  const registerUser = (firebaseRes) => {
    let name = firebaseRes.user.displayName.split(' ');
    let firstName = name[0];
    let lastName = name[1];
    let email = firebaseRes.user.email;
    let bodyParam = {firstName, lastName, email};
    console.log('bodyParam', bodyParam);
    axios.post('/auth', bodyParam)
      .then((res) => {

        if (res.data !== '') {
          console.log('post res', res.data.user_id);
          setUserId(res.data.user_id);
        }

        if (res.data === '') {
          axios.get('/auth', {
            params: {
              email: email
            }
          })
            .then((res) => {
              console.log('get res', res.data.user_id);
              setUserId(res.data.user_id);
            })
            .catch((err) => {
              console.log('err getting user id', err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };



  return (
    <mainContext.Provider value={{userId, registerUser}}>
      {children}
    </mainContext.Provider>
  );
}

//custom hook
export function useMain() {
  return useContext(mainContext);
}