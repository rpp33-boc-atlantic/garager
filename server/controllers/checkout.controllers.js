// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const { STRIPE_SECRET_KEY } = require('../../config.js');
const stripe = require('stripe')(STRIPE_SECRET_KEY);

module.exports = {
  checkoutSession: {
    post: (req, res) => {
      res.send('TEST: checkout here in controllers');
    },
  },
};