import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  const [itemID, setItemID] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const queryItemID = query.get('item_id');
    setItemID(queryItemID);
  }, []);
  
  return (
    <>
      <h1>Thank you for using Garager!</h1>
      <h2>Please communicate with the item's owner to arrange pick up time and location.</h2>
      <button><Link to='/Messages' state={{ itemID: {itemID} }}>Messages</Link></button>
    </>
  );
};

export default CheckoutSuccess;