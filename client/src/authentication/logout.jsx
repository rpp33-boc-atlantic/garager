import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext.jsx';
import { Button } from 'react-bootstrap';
import {useMain} from '../context/MainContext.jsx';
const Logout = () => {
  const { user, logOut } = useUserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.messsage);
    }
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/Login');
  };

  if (user) {
    return (
      <>
        <div className='p-4 box mt-1 text-center'>
          Welcome
          <br></br>
          {user.email}
        </div>
        <div className='d-grid gap-2'>
          <Button variant='primary' onClick={handleLogOut}>Log Out</Button>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='p-4 box mt-3 text-center'>
          Hello.Welcome!
        </div>
        <div className='d-grid gap-2'>
          <Button variant='primary' onClick={handleClick}>Log In</Button>
        </div>
      </>

    );
  }
};

export default Logout;