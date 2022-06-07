/* This is an example file for where we can put the CONTROLLERS functions for our particular feature. The code below is just an example and will be different for each feature!

file naming example: accounts.controllers.js, postItem.contollers.js (you can name it as you wish)
*/
const models = require('../models/account.models.js');

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
  },
  data: {
    get: (req, res) => {
      let table = req.query.table;
      console.log('table', table);
      // var table = params.get('table-name') ? params.get('table-name') : 'items';
      models.data.get( table, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(data);
        }
      });
    },
  },
};
