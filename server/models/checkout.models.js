const pool = require('../database/database.js');

module.exports = {
  onboardUser: {
    post: (accoundID, userID, callback) => {
      // UPDATE USER TABLE WITH ACCOUNT ID
      const queryText = `UPDATE users 
        SET stripe_id = ${accountID}
        WHERE user_id = ${userID}`;

      pool.query(queryText, (err, res) => {
        if (err) {
          callback(err.stack);
        } else {
          console.log('DB response in onboardUser:', res.rows);
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
          callback(res.rows[0]);
        }
      });
    },
  },
};