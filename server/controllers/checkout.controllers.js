/* eslint-disable camelcase */
const { STRIPE_SECRET_KEY } = require('../../config.js');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://localhost:3000';

module.exports = {
  checkoutSession: {
    post: async (req, res) => {
      // res.send('TEST: checkout here in controllers');
      // this is just a placeholder until connection with Item Details Feature
      const testReq = {
        itemName: 'circular saw from Sue Lee', // refactor to send to Owner's Stripe Account (i.e. Sue Lee)
        priceInCents: 1000 // $10
      };

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // stripe example: Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            // stripe example: price: '{{PRICE_ID}}',
            price_data: {
              currency: 'usd',
              product_data: {
                name: testReq.itemName
              },
              unit_amount: testReq.priceInCents,
            },
            quantity: 1, // may not change unless renting more than one of the same item
          },
        ],
        mode: 'payment',
        // payment_method_types: ['card'], // may not need this - card payments enabled by default
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });
    
      res.redirect(303, session.url);
    },
  },
};