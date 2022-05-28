import React from 'react';
import axios from 'axios';

const CheckoutButton = () => {

  const handleClick = async () => {
    console.log('clicked here checkout button');
    // ***** replace with actual ItemView Data *****
    const itemInfo = {
      name: 'kayak from Kevin Krim',
      priceInCents: 2000,
    };
    
    axios.post('/checkout/create-session', itemInfo)
      .then((response) => {
        console.log('response from checkoutButton', response);
        window.location = response.data.url;
      })
      .catch((error) => {
        console.log('ERROR from checkoutButton', error);
      });
  };

  return (
    <button onClick={handleClick}>Rent This Item Now</button>
  );
};

export default CheckoutButton;
