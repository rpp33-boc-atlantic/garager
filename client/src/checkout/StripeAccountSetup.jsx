import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RefundButton from './RefundButton.jsx';

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
    <>
      <h1>Start Earning!</h1>
      <h2>Setup a Stripe account to recieve payments from items rented out from your garage!</h2>
      <h3>Status of Stripe Account: <strong>{status}</strong></h3>
      <button onClick={handleClick}>Create/Update Your Stripe Account</button>
      {/* REMOVE REFUND BUTTON AFTER INTEGRATION WITH ACCOUNT */}
      <RefundButton />
    </>
  );
};

export default StripeAccountSetup;