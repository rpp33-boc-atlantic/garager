import React from 'react';
import axios from 'axios';

const StripeAccountSetup = () => {

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
    </>
  );
};

export default StripeAccountSetup;