import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StripeAccountSetup = () => {
  const [status, setStatus] = useState('Stripe account setup incomplete');

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
    console.log('clicked here stripe setup button');
    
    axios.post('/checkout/onboard-user')
      .then((response) => {
        window.location = response.data.url;
      })
      .catch((error) => {
        console.log('ERROR from stripe setup', error);
      });
  };

  return (
    <>
      <h1>Start Earning!</h1>
      <h2>Setup a Stripe account to recieve payments from items rented out from your garage!</h2>
      <button onClick={handleClick}>Create A Stripe Account</button>
      <h3>Status of Stripe Account: <strong>{status}</strong></h3>
    </>
  );
};

export default StripeAccountSetup;