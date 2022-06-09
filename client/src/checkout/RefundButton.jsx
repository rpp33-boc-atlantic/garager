import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';


const RefundButton = (props) => {

  const handleClick = async () => {
    // ***** REFACTOR: props.transactionID - data type can be integer or string
    // ***** REFACTOR: props.owner_id - data type can be integer or string

    const refundData = {
      transactionID: '209',
      ownerID: '4',
    };
    console.log('props', props);
    axios.put('/checkout/refund', refundData)
      .then((response) => {
        console.log('response from refundButton', response);
      })
      .catch((error) => {
        console.log('ERROR from refundButton', error);
        alert('This transaction has already been refunded');
      });
  };

  return (
    <Button onClick={handleClick}>Cancel</Button>
  );
};

export default RefundButton;
