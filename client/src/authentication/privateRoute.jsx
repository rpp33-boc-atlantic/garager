import React from 'react';
import { Navigate} from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext.jsx';
import { auth } from '../firebase';

const PrivateRoute = ({children}) => {
  //check if user is authenticated, if not, redirect to login
  let { user } = useUserAuth();
  if (!user) {
    return <Navigate to='/login'/>;
  }
  return children;

};


export default PrivateRoute;