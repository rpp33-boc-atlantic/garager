import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { FaStripe } from 'react-icons/fa';

const StripeAccountSetup = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    console.log('checking for account completion', window.location);
    axios.get('/checkout/check-account-completion')
      .then((response) => {
        console.log('response from /check-account-completion', response.data);
        setStatus(response.data);
      })
      .catch((error) => {
        console.log('ERROR from /check-account-completion', error);
      });
  });

  const handleClick = async () => {
    axios.post('/checkout/onboard-user')
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