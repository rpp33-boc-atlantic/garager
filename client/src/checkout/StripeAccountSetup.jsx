import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { FaStripe } from 'react-icons/fa';

const StripeAccountSetup = () => {
  const [status, setStatus] = useState('');

  const userId = localStorage.getItem('currentId');

  useEffect(() => {
    axios.get('/checkout/check-account-completion', {
      params: {
        userID: userId
      }
    })
      .then((response) => {
        setStatus(response.data);
      })
      .catch((error) => {
        console.log('ERROR from /check-account-completion', error);
      });
  });

  const handleClick = () => {
    axios.post('/checkout/onboard-user', {
      userID: userId
    })
      .then((response) => {
        window.location = response.data.url;
      })
      .catch((error) => {
        console.log('ERROR from stripe setup', error);
      });
  };

  return (
    <Container className='pt-5 text-center' style={{ minHeight: '50vh' }}>
      <h1>Stripe Account Setup</h1>
      <h2>Setup an account to recieve payments from your listings!</h2>
      <h3>Status of Stripe Account: <strong>{status}</strong></h3>
      <Button onClick={handleClick} className='mt-3'><FaStripe size={50} /></Button>
    </Container>
  );
};

export default StripeAccountSetup;