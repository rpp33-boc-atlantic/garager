const client = require('../database/database.js');

module.exports = {
  registerUser: {
    post: async (firstName, lastName, email, callback) => {
      let registerUserInfo = `INSERT INTO users (firstName, lastName, email)
      VALUES (${firstName}, ${lastName}, ${email})
      ON CONFLICT
      DO NOTHING
      RETURNING user_id`;

      await pool.query(registerUserInfo, (err, res) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
      });
    },
  },
};