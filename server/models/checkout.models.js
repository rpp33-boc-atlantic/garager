const pool = require('../database/database.js');

module.exports = {
  checkoutSession: {
    post: (rate, pickUpDate, returnDate, callback) => {
      // INSERT INTO transactions(rate, pickUpDate, returnDate) VALUES (16, '2022-07-23T04:00:00.000Z', '2022-07-25T03:59:59.999Z') RETURNING transaction_id;
      // DELETE FROM transactions WHERE transaction_id = 207;
      const queryText = `INSERT INTO transactions(rate, pickUpDate, returnDate)
        VALUES (${rate}, '${pickUpDate}', '${returnDate}')
        RETURNING transaction_id`;

      pool.query(queryText, (err, res) => {
        if (err) {
          console.log('ERROR in models.checkout.checkoutSession.post:', err);
          callback(err);
        } else {
          callback(null, res.rows[0].transaction_id);
        }
      });
    }
  },
  onboardUser: {
    post: (accountID, userID, callback) => {
      // UPDATE USER TABLE WITH ACCOUNT ID
      const queryText = `UPDATE users 
        SET stripe_id = '${accountID}'
        WHERE user_id = ${userID}`;

      pool.query(queryText, (err, res) => {
        if (err) {
          console.log('ERROR in models.checkout.onboardUser.post:', err);
          callback(err);
        } else {
          callback(null);
        }
      });
    },
  },
  checkAccountCompletion: {
    get: (userID, callback) => {
      const queryText = `SELECT stripe_id
        FROM users
        WHERE user_id = ${userID}`;

      pool.query(queryText, (err, res) => {
        if (err) {
          console.log('ERROR in models.checkout.checkAccountCompletion.get:', err);
          callback(err);
        } else {
          callback(null, res.rows[0].stripe_id);
        }
      });
    },
  },
  refund: {
    getPaymentID: (transactionID, callback) => {
      const queryText = `SELECT paymentIntent_id 
        FROM transactions 
        WHERE transaction_id = ${transactionID}`;

      pool.query(queryText, (err, res) => {
        if (err) {
          console.log('ERROR in models.checkout.refund.getPaymentID:', err);
          callback(err);
        } else if (!res.rows[0].paymentintent_id) {
          callback('There are no Stripe payment records for this transaction. Please message the owner directly for a refund.');
        } else {
          callback(null, res.rows[0].paymentintent_id);
        }
      });
    },
    getStripeID: (ownerID, callback) => {
      const queryText = `SELECT stripe_id
        FROM users
        WHERE user_id = ${ownerID}`;

      pool.query(queryText, (err, res) => {
        if (err) {
          console.log('ERROR in models.checkout.refund.getStripeID:', err);
          callback(err);
        } else if (!res.rows[0].stripe_id || res.rows[0].stripe_id === 'null') {
          callback('The owner does not have a Stripe Account. Please message the owner directly for a refund.');
        } else {
          callback(null, res.rows[0].stripe_id);
        }
      });
    },
    updateStatus: (transactionID, callback) => {
      const queryText = `UPDATE transactions
        SET refunded = true
        WHERE transaction_id = ${transactionID}`;
      
      pool.query(queryText, (err) => {
        if (err) {
          console.log('ERROR in models.checkout.refund.updateStatus:', err);
          callback(err);
        } else {
          callback(null);
        }
      });
    },
  },
  webhook: {
    post: {
      paymentIntent: (paymentIntentID, metadata, paymentStatus, callback) => {
        // UPDATE transactions SET paymentIntent_id = 'pi_3L9IrO9APWIdFUQG0je9LkXg', payment_status = 'completed', owner_id = 5, renter_id = 1, item_id = 1 WHERE transaction_id = 256;
        const queryText = `UPDATE transactions 
        SET paymentIntent_id = '${paymentIntentID}',
            owner_id = ${metadata.owner_id},
            renter_id = ${metadata.renter_id},
            item_id = ${metadata.item_id},
            payment_status = '${paymentStatus}'
        WHERE transaction_id = ${metadata.transaction_id}`;

        pool.query(queryText, (err, res) => {
          if (err) {
            console.log('ERROR in models.checkout.webhook.post:', err);
            callback(err);
          } else {
            callback(null);
          }
        });
      },
    },
  },
};