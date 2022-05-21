/* This is an example file for where we can put the CONTROLLERS functions for our particular feature. The code below is just an example and will be different for each feature!

file naming example: accounts.controllers.js, postItem.contollers.js (you can name it as you wish)

const models = require('../models/example.models.js');

module.exports = {
  example: {
    get: (req, res) => {
      models.example.get(itemId, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(data);
        }
      });
    },
  },
};
