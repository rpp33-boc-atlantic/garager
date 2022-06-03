import React from 'react';
import { Link } from 'react-router-dom';

const DirectToStripeAccountSetupPage = () => {
  return (
    <p>Be sure to <Link to='/Stripe-Account-Setup'>setup a Stripe account</Link> to accumulate earnings from your rented items!</p>
  );
};

export default DirectToStripeAccountSetupPage;