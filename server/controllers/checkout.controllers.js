/* eslint-disable camelcase */
const { STRIPE_SECRET_KEY } = require('../../config.js');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://localhost:3000';

module.exports = {
  checkoutSession: {
    post: async (req, res) => {
      try {
        console.log('REQ BODY IN CHECKOUT SESSION:', req.body);
        // THINGS I NEED: price, owner's stripe account id, successful - item id (pass to meesages), once successful - data range to make call to database to make it unavailable
        const checkoutSession = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `${req.body.name} from ${req.body.owner}`,
                },
                unit_amount: req.body.priceInCents,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${YOUR_DOMAIN}/CheckoutSuccess?item_id=${req.body.itemID}`,
          cancel_url: `${YOUR_DOMAIN}/CheckoutCancel`,
        }, {
          stripeAccount: 'acct_1L65TH4covfuEldK', // ***** REFACTOR WITH OWNER'S STRIPE ACCOUNT ID
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
        // console.log('session accountID', req.session.accountID);
        // ***** ONCE DATABASE IS DEPLOYED, UPDATE USER TABLE WITH ACCOUNT ID ***** ID INSIDE DATABASE

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
    },
  },
  checkAccountCompletion: {
    get: async (req, res) => {
      // console.log('SESSION ACCOUNT ID', req.session.accountID);
      // ***** REFACTOR TO CHECK DATABASE - IF NO STRIPE_ID, 'SETUP INCOMPLETE'
      if (!req.session) {
        res.send('Stripe account setup incomplete');
      } else {
        const accountInfo = await stripe.accounts.retrieve(
          req.session.accountID // ***** REFACTOR WITH STRIPE_ID
        );
        // console.log('accountInfo charges enabled:', accountInfo.details_submitted);
        if (!accountInfo.details_submitted) {
          res.send('Please complete the account setup proccess');
        } else {
          res.send('Completed Account Setup - Thank you!');
        }
      }
    },
  },
};