const client = require('../database/database.js');

module.exports = {
  onboardUser: {
    post: (accoundID, userID, callback) => {
      // UPDATE USER TABLE WITH ACCOUNT ID
      client.connect((err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log('currently inside GARAGER database for onboardUser post');
        }
      });

      const queryText = `UPDATE users 
        SET stripe_id = ${accountID}
        WHERE user_id = ${userID}`;

      client.query(queryText, (err, res) => {
        if (err) {
          callback(err.stack);
        } else {
          console.log('DB response:', res.rows);
          callback(null);
        }
        client.end();
      });
    },
  },
};