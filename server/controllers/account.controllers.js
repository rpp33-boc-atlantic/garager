/* This is an example file for where we can put the CONTROLLERS functions for our particular feature. The code below is just an example and will be different for each feature!

file naming example: accounts.controllers.js, postItem.contollers.js (you can name it as you wish)
*/
const models = require('../models/example.models.js');

module.exports = {
  upcomingRentals: {
    get: (req, res) => {
      res.send('this route will send back current transaction information');
      /* models.example.get(itemId, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(data);
        }
      });*/

    },
  },
  getData: {
    get: (req, res) => {
      var table = 'items';
      models.get_data.get( table, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(data);
        }
      });
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
