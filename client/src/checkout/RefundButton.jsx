import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';


const RefundButton = (props) => {

  const handleClick = async () => {
    // ***** REFACTOR: props.transactionID - data type can be integer or string
    // ***** REFACTOR: props.owner_id - data type can be integer or string

    const refundData = {
      transactionID: props.transaction_id,
      ownerID: props.owner_id,
    };

    axios.put('/checkout/refund', refundData)
      .then((response) => {
        console.log('response from refundButton', response);
      })
      .catch((error) => {
        console.log('ERROR from refundButton', error);
        alert(error.response.data);
      });
  };

  return (
    <Button onClick={handleClick}>Cancel</Button>
  );
};

export default RefundButton;
