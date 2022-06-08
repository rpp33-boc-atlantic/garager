/* eslint-disable camelcase */
/* This is an example file for where we can put the CONTROLLERS functions for our particular feature. The code below is just an example and will be different for each feature!

file naming example: accounts.controllers.js, postItem.contollers.js (you can name it as you wish)
*/
const models = require('../models/account.models.js');

module.exports = {
  rentals: {
    get: (req, res) => {
      let renter_id = req.query.id;
      // res.send('this route will send back current transaction information');
      models.rentals.get(renter_id, (err, data) => {
        if (err) {
          console.log('err', err);
          res.status(500).send(err);
        } else {
          console.log('datarentals', data);
          res.status(200).send(data);
        }
      });

    },
  },
  listings: {
    get: (req, res) => {
      let owner_id = req.query.id;

      models.listings.get(owner_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          console.log('datalistings', data);
          res.status(200).send(data);
        }
      });
    },
  },
  earnings: {
    get: (req, res) => {
      // let owner_id = req.query.id || 5;
      let owner_id = 5;

      models.earnings.get(owner_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          console.log('datalistings', data);
          res.status(200).send(data);
        }
      });
    },
  }
};
