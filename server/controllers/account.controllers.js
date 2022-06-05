/* This is an example file for where we can put the CONTROLLERS functions for our particular feature. The code below is just an example and will be different for each feature!

file naming example: accounts.controllers.js, postItem.contollers.js (you can name it as you wish)
*/
const models = require('../models/account.models.js');

module.exports = {
  upcomingRentals: {
    get: (req, res) => {
      let itemId = req.query.item_id;
      // res.send('this route will send back current transaction information');
      models.get_rentals.get(itemId, (err, data) => {
        if (err) {
          console.log('err', err);
          res.status(500).send(err);
        } else {
          console.log('data', data);
          res.send(data);
        }
      });

    },
  },
  pastRentals: {
    get: (req, res) => {
      res.send('this route will send a history of past transactions');
    //   models.example.get(itemId, (err, data) => {
    //     if (err) {
    //       res.status(500).send(err);
    //     } else {
    //       res.send(data);
    //     }
    //   });
    },
  },
  listings: {
    get: (req, res) => {
      res.send('this route will send user a list of their posted items');
    //   models.example.get(itemId, (err, data) => {
    //     if (err) {
    //       res.status(500).send(err);
    //     } else {
    //       res.send(data);
    //     }
    //   });
    },
  },
  earnings: {
    get: (req, res) => {
      res.send('this route will send back data on money earned');
    //   models.example.get(itemId, (err, data) => {
    //     if (err) {
    //       res.status(500).send(err);
    //     } else {
    //       res.send(data);
    //     }
    //   });
    },
  }
};
