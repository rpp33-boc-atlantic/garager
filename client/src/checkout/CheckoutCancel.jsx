import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

const CheckoutCancel = () => {
  const [itemID, setItemID] = useState('');
  const [hrefText, sethrefText] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const queryItemID = query.get('item_id');
    setItemID(queryItemID);
  }, []);

  return (
    <Container className='pt-5 text-center' style={{ minHeight: '50vh' }}>
      <h1>There was an issue processing your payment.</h1>
      <h2>Please try again.</h2>
      <Button href={`/Item/id=${itemID}`} className='mt-3'>Return to Item</Button>
    </Container>
  );
};

export default CheckoutCancel;