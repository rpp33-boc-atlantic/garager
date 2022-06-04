import React from 'react';
import axios from 'axios';

const RefundButton = (props) => {

  const handleClick = async () => {
    console.log('clicked here refund button');
    const transactionID = { transactionId: '0' }; // REFACTOR: props.transactionID
    
    axios.put('/checkout/refund', transactionID)
      .then((response) => {
        console.log('response from refundButton', response);
      })
      .catch((error) => {
        console.log('ERROR from refundButton', error);
      });
  };

  return (
    <button onClick={handleClick}>Refund Renter</button>
  );
};

export default RefundButton;
