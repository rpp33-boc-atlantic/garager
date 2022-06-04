const client = require('../database/database.js');

module.exports = {
  registerUser: {
    post: async (firstName, lastName, email, callback) => {
      // get stuff from database
      let registerUserInfo = `INSERT INTO users (firstName, lastName, email)
      VALUES (${firstName}, ${lastName}, ${email})
      ON CONFLICT (email)
      DO NOTHING`;
      //TODO: is it client.query? probably different than using pool
      await client.query(registerUserInfo, (err, res) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
      });
    },
  },
};