/* eslint-disable camelcase */
/* This is an example file for where we can put the CONTROLLERS functions for our particular feature. The code below is just an example and will be different for each feature!

file naming example: accounts.controllers.js, postItem.contollers.js (you can name it as you wish)
*/
const models = require('../models/account.models.js');

module.exports = {
  rentals: {
    get: (req, res) => {
      let renter_id = req.query.id;
      // console.log('RENTALS');
      // res.send('this route will send back current transaction information');
      models.rentals.get(renter_id, (err, data) => {
        if (err) {
          console.log('err', err);
          res.status(500).send(err);
        } else {
          // console.log('datarentals', data);
          res.status(200).send(data);
        }
      });

    },
  },
  listings: {
    get: (req, res) => {
      let owner_id = req.query.id;
      // console.log('LISTINGS');
      models.listings.get(owner_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          // console.log('LISTINGS', data);
          res.status(200).send(data);
        }
      });
    },
  },
  earnings: {
    get: (req, res) => {
      // let owner_id = req.query.id || 5;
      let user_id = req.query.id;
      // console.log('looking for data for user', user_id);
      models.earnings.get(user_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          // console.log('datalistings', data);
          res.status(200).send(data);
        }
      });
    },
  },
  profile: {
    get: (req, res) => {
      let user_id = req.query.id;
      // console.log('looking for data for user', user_id);
      models.profile.get(user_id, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          // console.log('datalistings', data);
          res.status(200).send(data);
        }
      });
    },
  },
  data: {
    get: (req, res) => {
      let table = req.query.table ? req.query.table : 'items';
      // console.log('table', table);
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
