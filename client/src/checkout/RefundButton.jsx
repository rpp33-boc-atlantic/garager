import React from 'react';
import axios from 'axios';

const RefundButton = (props) => {

  const handleClick = async () => {
    console.log('clicked here refund button');
    // ***** REFACTOR: props.transactionID - data type can be integer or string
    // ***** REFACTOR: props.owner_id - data type can be integer or string

    const refundData = {
      transactionID: '211',
      ownerID: '4',
    };
    
    axios.put('/checkout/refund', refundData)
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
