const pool = require('../database/database.js');

module.exports = {
  onboardUser: {
    post: (accountID, userID, callback) => {
      // UPDATE USER TABLE WITH ACCOUNT ID
      const queryText = `UPDATE users 
        SET stripe_id = '${accountID}'
        WHERE user_id = ${userID}`;

      pool.query(queryText, (err, res) => {
        if (err) {
          console.log('ERROR IN MODELS CHECKOUT ONBOARD USER:', err);
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
          callback(err);
        } else {
          callback(null, res.rows[0].stripe_id);
        }
      });
    },
  },
  webhook: {
    post: {
      paymentIntent: (paymentIntentID, metadata, paymentStatus, callback) => {
        // UPDATE transactions SET paymentIntent_id = 'pi_3L7xaMQGUt2gvFzT1f316ISt', payment_status = 'completed', owner_id = 4, renter_id = 2, item_id = 5 WHERE transaction_id = 212;
        const queryText = `UPDATE transactions 
        SET paymentIntent_id = '${paymentIntentID}',
            owner_id = ${metadata.owner_id},
            renter_id = ${metadata.renter_id},
            item_id = ${metadata.item_id},
            payment_status = '${paymentStatus}'
        WHERE transaction_id = ${metadata.transaction_id}`;

        pool.query(queryText, (err, res) => {
          if (err) {
            console.log('ERROR IN POSTING PAYMENT WEBHOOK', err);
            callback(err);
          } else {
            callback(null);
          }
        });
      },
    },
  },
  checkoutSession: {
    post: (rate, pickUpDate, returnDate, callback) => {
      // INSERT INTO transactions(rate, pickUpDate, returnDate) VALUES (16, '2022-07-01', '2022-07-03') RETURNING transaction_id;
      // DELETE FROM transactions WHERE transaction_id = 207;
      const queryText = `INSERT INTO transactions(rate, pickUpDate, returnDate)
        VALUES (${rate}, '${pickUpDate}', '${returnDate}')
        RETURNING transaction_id`;

      pool.query(queryText, (err, res) => {
        if (err) {
          console.log('ERROR IN MODELS CHECKOUT SESSION:', err);
          callback(err);
        } else {
          console.log('response from models CHECKOUT SESSION', res.rows);
          callback(null, res.rows[0].transaction_id);
        }
      });
    }
  }
};