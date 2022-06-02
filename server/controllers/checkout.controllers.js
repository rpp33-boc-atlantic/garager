/* eslint-disable camelcase */
const { STRIPE_SECRET_KEY } = require('../../config.js');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://localhost:3000';

module.exports = {
  checkoutSession: {
    post: async (req, res) => {
      try {
        // console.log('REQ BODY', req.body);
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: req.body.name
                },
                unit_amount: req.body.priceInCents,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${YOUR_DOMAIN}?success=true`,
          cancel_url: `${YOUR_DOMAIN}?canceled=true`,
        });

        // res.redirect(303, session.url); <-- DID NOT WORK USING AXIOS IN FRONTEND; BELOW CODE WORKS
        res.json({ url: session.url });
      } catch (e) {
        // If there is an error send it to the client
        res.status(500).json({ error: e.message });
      }
    },
  },
  onboardUser: {
    post: (req, res) => {
      console.log('IN ONBOARD USER');
      res.send('BOARDING USER');
    },
  }
};