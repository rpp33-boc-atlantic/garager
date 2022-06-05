const axios = require('axios');
const models = require('../models/auth.models.js');

module.exports = {
  registerUser: {
    post: (req, res) => {
      console.log('reqBody', req.body);
      let email = req.body.email;
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      models.registerUser.post(firstName, lastName, email, (err, data) => {
        if (err) {
          console.log(err.message);
          res.status(500).send(err);
        } else {
          res.status(201);
          res.send(data);
        }
      });
    },
  },
};