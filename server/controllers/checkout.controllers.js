/* eslint-disable camelcase */
const { STRIPE_SECRET_KEY, STRIPE_SECRET_ENDPOINT } = require('../../config.js');
const stripe = require('stripe')(STRIPE_SECRET_KEY);
// const YOUR_DOMAIN = 'http://localhost:3000'; ***** Refactored to use origin for deployed or localhost
const models = require('../models/checkout.models.js');

module.exports = {
  checkoutSession: {
    post: async (req, res) => {
      const origin = `${req.headers.origin}`;
      console.log('origin', origin);
      const renterID = 9; // Kelly Kapoor ***** NEED TO REFACTOR HARDCODED DATA

      const { name: itemName, itemID, owner: ownerName, ownerID, priceInCents, rate } = req.body;
      const pickUpDate = req.body.dateRange[0];
      const returnDate = req.body.dateRange[1];

      // First check if item owner has a completed stripe account
      models.checkAccountCompletion.get(ownerID, async (err, stripeID) => {
        // If they don't, send alert that rent cannot occur
        if (err || !stripeID) {
          res.status(500).send('Item owner has not setup a Stripe Account');
        } else {
          try {
            const accountInfo = await stripe.accounts.retrieve(stripeID);
            if (!accountInfo.details_submitted || !accountInfo.charges_enabled) {
              res.status(500).send('Item owner has an incomplete Stripe Account Setup');
            } else { // Owner has a Stripe Account, so proceed to checkout
              // First, get transaction_id from DB by inserting transactions table with NOT NULL data (rate, pickUpDate, returnDate)
              models.checkoutSession.post(rate, pickUpDate, returnDate, async (err, transactionID) => {
                if (err) {
                  res.status(500).send(err);
                } else {
                  // Then, proceed to checkout
                  const checkoutSession = await stripe.checkout.sessions.create({
                    line_items: [
                      {
                        price_data: {
                          currency: 'usd',
                          product_data: {
                            name: `${itemName} from ${ownerName}`,
                          },
                          unit_amount: priceInCents,
                        },
                        quantity: 1,
                      },
                    ],
                    mode: 'payment',
                    success_url: `${origin}/CheckoutSuccess?item_id=${itemID}&owner_name=${ownerName}&item_name=${itemName}`,
                    cancel_url: `${origin}/CheckoutCancel?item_id=${itemID}`,
                    payment_intent_data: {
                      metadata: {
                        transaction_id: transactionID,
                        owner_id: ownerID,
                        renter_id: renterID,
                        item_id: itemID,
                      }
                    }
                  }, {
                    stripeAccount: stripeID,
                  });
                  // res.redirect(303, session.url); <-- DID NOT WORK USING AXIOS IN FRONTEND; BELOW CODE WORKS
                  res.json({ url: checkoutSession.url });
                }
              });
            }
          } catch (err) {
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
        const userID = req.body.userID;
        const origin = `${req.headers.origin}`;
        // check database if account exists
        models.checkAccountCompletion.get(userID, async (err, stripeID) => {
          if (err) {
            res.status(500).send(err);
          } else {
            if (stripeID) { // stripe account exists
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
              // Store the ID of the new Standard connected account.
              models.onboardUser.post(account.id, userID, (err) => {
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
      // console.log('userID', req.query.userID);
      const userID = req.query.userID;
      models.checkAccountCompletion.get(userID, async (err, stripeID) => {
        if (err) {
          res.status(500).send(err);
        } else if (!stripeID || stripeID === 'null') {
          res.send('Incomplete - please create an account.');
        } else {
          try {
            const accountInfo = await stripe.accounts.retrieve(stripeID);
            // console.log('accountInfo', accountInfo);
            if (!accountInfo.details_submitted) {
              res.send('In-progress - please continue to fill out the details to setup your account.');
            } else if (!accountInfo.charges_enabled) {
              res.send('Nearly there! Stripe is currently verifying your details. In a few minutes, please click the button to complete the final steps. This may take a few updates to finalize the account.');
            } else {
              res.send('complete');
            }
          } catch (err) {
            res.status(500).send({
              error: err.message,
            });
          }
        }
      });
    },
  },
  refund: {
    put: (req, res) => {
      const { transactionID, ownerID } = req.body;

      models.refund.getStripeID(ownerID, (err, stripeID) => {
        if (err) {
          res.status(500).send(err);
        } else {
          models.refund.getPaymentID(transactionID, async (err, paymentintentID) => {
            if (err) {
              res.status(500).send(err);
            } else {
              try {
                // issue refund
                const refund = await stripe.refunds.create({
                  payment_intent: paymentintentID,
                }, {
                  stripeAccount: stripeID,
                });
                // update transactions with refunded = true
                models.refund.updateStatus(transactionID, (err) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    res.send();
                  }
                });
              } catch (err) {
                res.status(500).send('This transaction has already been refunded.');
              }
            }
          });
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
        console.log('ERROR IN controllers.checkout.webhook.post', err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        // UPDATE TRANSACTIONS TABLE WITH PAYMENTINTENT_ID, PAYMENT_STATUS, AND METADATA USING METADATA'S TRANSACTION_ID
        console.log('payment_intent.succeeded TRIGGERED');
        models.webhook.post.paymentIntent(paymentIntent.id, paymentIntent.metadata, 'completed', (error, response) => {
          if (error) {
            res.status(500).send(error);
          } else {
            res.send();
          }
        });
      } else {
        console.log(`Unhandled event type ${event.type}`);
        res.send();
      }
    }
  }
};