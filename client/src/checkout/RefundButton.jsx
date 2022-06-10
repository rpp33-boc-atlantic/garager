import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';


const RefundButton = (props) => {

  const handleClick = async () => {
    const refundData = {
      transactionID: props.transaction_id,
      ownerID: props.owner_id,
    };

    axios.put('/checkout/refund', refundData)
      .then((response) => {
        alert('This rental has been successfully refunded.');
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  return (
    <Button disabled ={props.disabled}onClick={handleClick}>Cancel</Button>
  );
};

export default RefundButton;
