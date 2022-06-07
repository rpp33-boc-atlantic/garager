/* eslint-disable func-style */
import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

const mainContext = createContext();

export function MainContextProvider({ children }) {
  const [userId, setUserId] = useState('initial value');

  const registerUser = (firstName, lastName, email) => {
    let bodyParam = {firstName, lastName, email};
    axios.post('/auth', bodyParam)
      .then((res) => {
        if (res.data !== '') {
          console.log('post res', res.data.user_id);
          const newUserId = res.data.user_id;
          setUserId(newUserId);
        }

        if (res.data === '') {
          axios.get('/auth', {
            params: {
              email: email
            }
          })
            .then((res) => {
              //console.log('get res', res.data.user_id);
              const newUserId = res.data.user_id;
              setUserId(newUserId);
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

  /*useEffect(() => {
    if (userId !== '') { setUserId(userId); }
    console.log('newUserId', userId);
  });*/

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