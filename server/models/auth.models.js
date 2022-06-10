const pool = require('../database/database.js');

module.exports = {
  registerUser: {
    post: async (firstName, lastName, email, callback) => {
      const registerUserInfo = {
        text: 'INSERT INTO users (firstName, lastName, email) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING RETURNING user_id',
        values: [firstName, lastName, email]
      };

      await pool.query(registerUserInfo, (err, res) => {
        if (err) {
          //console.log('err in models', err.message);
          callback(err, null);
        } else {
          //console.log('database res', res);
          callback(null, res.rows[0]);
        }
      });
    },

    get: async (email, callback) => {
      // const getUserId = `SELECT user_id FROM users WHERE email = 'arielddw@gmail.com'`;
      // const getUserId = `SELECT user_id FROM users WHERE email = '${email}'`;
      // console.log('user email', email);
      const getUserId = {
        text: 'SELECT user_id FROM users WHERE LOWER(email) = LOWER($1)',
        values: [email]
      };
      await pool.query(getUserId, (err, res) => {
        if (err) {
          console.log(err.message);
          callback(err, null);
        } else {
          callback(null, res.rows[0]);
        }
      });
    }
  },
};



