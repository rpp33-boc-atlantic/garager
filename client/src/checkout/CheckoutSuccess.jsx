import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

const CheckoutSuccess = () => {
  const [itemID, setItemID] = useState('');
  const [ownerName, setOwnerName] = useState(`the item's owner`);
  const [itemName, setItemName] = useState('item');


  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const queryItemID = query.get('item_id');
    setItemID(queryItemID);

    const queryOwnerName = query.get('owner_name');
    if (queryOwnerName) {
      setOwnerName(queryOwnerName);
    }

    const queryItemName = query.get('item_name');
    if (queryItemName) {
      setItemName(queryItemName);
    }
  }, []);
  
  return (
    <Container className='pt-5 text-center' style={{ minHeight: '50vh' }}>
      <h1>Thank you for using Garager!</h1>
      <h2>Please communicate with {ownerName} to arrange a pick up time and location for the {itemName}.</h2>
      <Button href='/Messages' className='mt-3' state={{ itemID: {itemID} }}>Messages</Button>
    </Container>
  );
};

export default CheckoutSuccess;