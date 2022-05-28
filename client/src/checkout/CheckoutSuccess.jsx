import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <>
      <h1>Thank you for using Garager!</h1>
      <h2>Please communicate with the item's owner to arrange pick up time and location.</h2>
      <button><Link to='/Messages'>Messages</Link></button>
    </>
  );
};

export default CheckoutSuccess;