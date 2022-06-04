/* eslint-disable camelcase */
const { STRIPE_SECRET_KEY, STRIPE_SECRET_ENDPOINT } = require('../../config.js');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://localhost:3000';
const models = require('../models/checkout.models.js');
const endpointSecret = STRIPE_SECRET_ENDPOINT;

module.exports = {
  checkoutSession: {
    post: async (req, res) => {
      try {
        console.log('REQ BODY IN CHECKOUT SESSION:', req.body);
        // THINGS I NEED: 
        // transaction_id SERIAL PRIMARY KEY, 
        // rate INT NOT NULL DEFAULT NULL, <-- from RentForm
        // pickUpDate DATE NOT NULL DEFAULT NULL, <-- from RentForm
        // returnDate DATE NOT NULL DEFAULT NULL, <-- from RentForm
        // owner_id INT, <-- from RentForm <-- INPUT AFTER WEBHOOK
        // renter_id INT, <-- from RentForm <-- INPUT AFTER WEBHOOK
        // item_id INT, <-- from RentForm <-- INPUT AFTER WEBHOOK
        // paymentIntent_id TEXT DEFAULT NULL <-- INPUT AFTER WEBHOOK

        // INSERT first with NOT NULL data (rate, pickUpDate, returnDate) and get transaction_id
        // Put transaction_id, owner_id, renter_id, item_id into metadata object

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
          metadata: { // ***** REFACTOR: once all data is passed down from RentForm
            transaction_id: 12345,
            owner_id: 0,
            renter_id: 1,
            item_id: 0,
          }
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
        // ***** ONCE DATABASE IS DEPLOYED, UPDATE USER TABLE WITH ACCOUNT ID *****
        // HARDCODE USER_ID UNTIL IT GETS PASSED FROM FRONTEND IN StripeAccountSetup.jsx
        const userID = 0;
        models.onboardUser.post(account.id, userID, (err) => {
          console.log('finished in models.onboardUser.post!');
          if (err) {
            res.status(500).send(err);
          }
        });

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
      // HARDCODE USER_ID UNTIL IT GETS PASSED FROM FRONTEND IN StripeAccountSetup.jsx
      const userID = 0;
      models.checkAccountCompletion.get(userID, async (err, accoundID) => {
        console.log('finished in models.checkAccountCompletion.get!');
        if (err) {
          res.status(500).send(err);
        } else if (accoundID === null) {
          res.send('Stripe account setup incomplete');
        } else {
          const accountInfo = await stripe.accounts.retrieve(accountID);
          // console.log('accountInfo charges enabled:', accountInfo.details_submitted);
          if (!accountInfo.details_submitted) {
            res.send('Please complete the account setup proccess');
          } else {
            res.send('Completed Account Setup - Thank you!');
          }
        }
      });

      /*
      if (!req.session.accountID) {
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
      } */
    },
  },
  webhook: {
    post: (req, res) => {
      const sig = request.headers['stripe-signature'];

      let event;

      try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Handle the event
      switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
        // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
  }
};