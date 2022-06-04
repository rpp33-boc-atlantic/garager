const axios = require('axios');

module.exports = {
  registerUser: {
    post: (req, res) => {
      let email = req.body.email;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      models.registerUser.post(firstName, lastName, email, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201);
          res.end();
        }
      });
    },
  },
};