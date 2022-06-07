/* eslint-disable camelcase */
const { STRIPE_SECRET_KEY, STRIPE_SECRET_ENDPOINT } = require('../../config.js');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://localhost:3000';
const models = require('../models/checkout.models.js');

module.exports = {
  checkoutSession: {
    post: async (req, res) => {
      // THINGS I NEED: 
      // transaction_id SERIAL PRIMARY KEY, 
      // rate INT NOT NULL DEFAULT NULL, <-- from RentForm
      // pickUpDate DATE NOT NULL DEFAULT NULL, <-- from RentForm
      // returnDate DATE NOT NULL DEFAULT NULL, <-- from RentForm
      // owner_id INT, <-- from RentForm <-- INPUT AFTER WEBHOOK
      // renter_id INT, <-- from RentForm <-- INPUT AFTER WEBHOOK
      // item_id INT, <-- from RentForm <-- INPUT AFTER WEBHOOK
      // paymentIntent_id TEXT DEFAULT NULL <-- INPUT AFTER WEBHOOK
      
      // console.log('REQ BODY IN CHECKOUT SESSION:', req.body);
      // const { ownerID } = req.body;
      const hardcodedOwnerID = 4;
      const hardcodeditemID = 5;

      // First check if item owner has a completed stripe account
      // If they don't, send alert that rent cannot occur
      models.checkAccountCompletion.get(ownerID, async (err, stripeID) => {
        if (err) {
          res.status(500).send('Item owner has an incomplete Stripe Account Setup');
        } else if (!stripeID) {
          res.status(500).send('Item owner has an incomplete Stripe Account Setup');
        } else {
          try {
            const accountInfo = await stripe.accounts.retrieve(stripeID);
            if (!accountInfo.details_submitted) {
              res.status(500).send('Item owner has an incomplete Stripe Account Setup');
            } else { // Owner has a Stripe Account, so proceed to checkout
              // INSERT first with NOT NULL data (rate, pickUpDate, returnDate) and get transaction_id
              models.checkoutSession.post(rate, pickUpDate, returnDate, (err, transactionID) => {
                
              });

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
                payment_intent_data: {
                  metadata: { // ***** REFACTOR: once all data is passed down from RentForm
                    transaction_id: 123456,
                    owner_id: 0,
                    renter_id: 1,
                    item_id: 0,
                  }
                }
              }, {
                stripeAccount: stripeID,
              });
              // res.redirect(303, session.url); <-- DID NOT WORK USING AXIOS IN FRONTEND; BELOW CODE WORKS
              res.json({ url: checkoutSession.url });
            }
          } catch (err) {
            console.log('inside checkout session catch block');
            res.status(500).send({
              error: err.message,
            });
          }
        }
      });
    },
  },
  onboardUser: {
    post: async (req, res) => {
      try {
        // ***** HARDCODE USER_ID UNTIL IT GETS PASSED FROM FRONTEND IN StripeAccountSetup.jsx
        const userID = 4; // Jack.Barker@hotmail.com 
        const origin = `${req.headers.origin}`;
        // check database if account exists
        models.checkAccountCompletion.get(userID, async (err, stripeID) => {
          if (err) {
            res.status(500).send(err);
          } else {
            if (stripeID) { // stripe account exists
              console.log('stripe ID exists', stripeID);

              const accountLink = await stripe.accountLinks.create({
                type: 'account_onboarding',
                account: stripeID,
                refresh_url: `${origin}/checkout/onboard-user/refresh?id=${stripeID}`,
                return_url: `${origin}/Stripe-Account-Setup`,
              });

              res.json({ url: accountLink.url });
              // res.redirect(303, accountLink.url); <-- DID NOT WORK
            } else { // stripe account doesn't exist - needs to be created
              const account = await stripe.accounts.create({
                type: 'standard',
              });
              console.log('new stripe ID account', account.id);
              // Store the ID of the new Standard connected account.
              models.onboardUser.post(account.id, userID, (err) => {
                console.log('finished in models.onboardUser.post!');
                if (err) {
                  res.status(500).send(err);
                }
              });

              const accountLink = await stripe.accountLinks.create({
                type: 'account_onboarding',
                account: account.id,
                refresh_url: `${origin}/checkout/onboard-user/refresh?id=${account.id}`,
                return_url: `${origin}/Stripe-Account-Setup`,
              });

              res.json({ url: accountLink.url });
              // res.redirect(303, accountLink.url); <-- DID NOT WORK
            }
          }
        });
      } catch (err) {
        res.status(500).send({
          error: err.message,
        });
      }
    },
    get: async (req, res) => {
      // get query paramesters (instead of using session)
      const stripeID = req.query.id;
      console.log('inside refresh', stripeID);

      try {
        const origin = `${req.secure ? 'https://' : 'http://'}${req.headers.host}`;
        const accountLink = await stripe.accountLinks.create({
          type: 'account_onboarding',
          account: stripeID,
          refresh_url: `${origin}/checkout/onboard-user/refresh?id=${stripeID}`,
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
      // ***** HARDCODE USER_ID UNTIL IT GETS PASSED FROM FRONTEND IN StripeAccountSetup.jsx
      const userID = 4; // Jack.Barker@hotmail.com 
      models.checkAccountCompletion.get(userID, async (err, stripeID) => {
        if (err) {
          res.status(500).send(err);
        } else if (!stripeID) {
          res.send('incomplete');
        } else {
          try {
            const accountInfo = await stripe.accounts.retrieve(stripeID);
            if (!accountInfo.details_submitted) {
              res.send('in-progress');
            } else {
              res.send('complete');
            }
          } catch (err) {
            console.log('checkAccountCompletion inside catch block');
            res.status(500).send({
              error: err.message,
            });
          }
        }
      });
    },
  },
  webhook: {
    post: (req, res) => {
      const sig = req.headers['stripe-signature'];

      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_SECRET_ENDPOINT);
      } catch (err) {
        console.log('ERROR IN WEBHOOK', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      // Handle the event
      switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('INSIDE PAYMENT SUCCESS', paymentIntent);
        // GO TO DATABASE AND UPDATE TRANSACTIONS TABLE WITH PAYMENTINTENT_ID AND PAYMENT_STATUS USING METADATA'S TRANSACTION_ID
        models.webhook.post.paymentIntent(paymentIntent.id, paymentIntent.metadata.transaction_id, 'completed', (err, res) => {
          if (err) {
            // res.status(500).send(err);
            res.send(err);
          }
        });
        break;
        // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      res.send();
    }
  }
};