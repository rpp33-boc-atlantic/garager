import React from 'react';
import axios from 'axios';

const CheckoutButton = () => {

  const handleClick = () => {
    console.log('clicked here checkout button');
  };

  return (
    <button onClick={handleClick}>Rent This Item Now</button>
  );
};

export default CheckoutButton;

/* EXAMPLE CODE FROM STRIPE DOCS
const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);
*/
