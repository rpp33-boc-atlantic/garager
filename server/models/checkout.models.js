const pool = require('../database/database.js');

module.exports = {
  onboardUser: {
    post: (accountID, userID, callback) => {
      console.log('IN MODELS: ACCOUNT ID', accountID);
      // UPDATE USER TABLE WITH ACCOUNT ID
      const queryText = `UPDATE users 
        SET stripe_id = '${accountID}'
        WHERE user_id = ${userID}`;

      pool.query(queryText, (err, res) => {
        if (err) {
          console.log('ERROR IN MODELS CHECKOUT ONBOARD USER:', err);
          callback(err.stack);
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
          callback(err.stack);
        } else {
          console.log('DB response in checkAccountCompletion:', res.rows[0]);
          callback(null, res.rows[0].stripe_id);
        }
      });
    },
  },
  webhook: {
    post: {
      paymentIntent: (paymentIntentID, transactionID, paymentStatus, callback) => {
        const queryText = `UPDATE transactions 
        SET paymentIntent_id = ${paymentIntentID},
            payment_status = ${paymentStatus}
            WHERE transaction_id = ${transactionID}`;

        pool.query(queryText, (err, res) => {
          if (err) {
            callback(err.stack);
          } else {
            console.log('response from models paymentIntent', res.rows);
            callback(null);
          }
        });
      },
    },
  },
  checkoutSession: {
    post: (rate, pickUpDate, returnDate, callback) => {
      const queryText = `INSERT INTO transactions(rate, pickUpDate, returnDate)
        VALUES (${rate}, ${pickUpDate}, ${returnDate})
        RETURNING transaction_id`;
    }
  }
};