/* eslint-disable camelcase */
const { STRIPE_SECRET_KEY } = require('../../config.js');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://localhost:3000';

module.exports = {
  checkoutSession: {
    post: async (req, res) => {
      try {
        // console.log('REQ BODY', req.body);
        const checkoutSession = await stripe.checkout.sessions.create({
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
        res.json({ url: checkoutSession.url });
      } catch (e) {
        // If there is an error send it to the client
        res.status(500).json({ error: e.message });
      }
    },
  },
  onboardUser: {
    post: async (req, res) => {
      try {
        const account = await stripe.accounts.create({
          type: 'standard',
        });

        // Store the ID of the new Standard connected account.
        req.session.accountID = account.id;
        console.log('session accountID', req.session.accountID);

        const origin = `${req.headers.origin}`;

        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${origin}/checkout/onboard-user/refresh`,
          return_url: `${origin}/Stripe-Account-Setup`,
          type: 'account_onboarding',
        });

        res.json({ url: accountLink.url });
        // res.redirect(303, accountLink.url);
      } catch (err) {
        res.status(500).send({
          error: err.message,
        });
      }
    },
    get: async (req, res) => {
      if (!req.session.accountID) {
        res.redirect('/checkout/onboard-user');
        return;
      }
    
      try {
        const { accountID } = req.session;
        const origin = `${req.secure ? 'https://' : 'http://'}${req.headers.host}`;
        const accountLink = await stripe.accountLinks.create({
          type: 'account_onboarding',
          account: accountID,
          refresh_url: `${origin}/checkout/onboard-user/refresh`,
          return_url: `${origin}/Stripe-Account-Setup`,
        });
        // res.json({ url: accountLink.url }); <-- DID NOT WORK
        res.redirect(303, accountLink.url);
      } catch (err) {
        res.status(500).send({
          error: err.message,
        });
      }
    }
  }
};