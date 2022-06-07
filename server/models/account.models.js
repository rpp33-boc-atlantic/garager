/* eslint-disable camelcase */
const client = require('../database/database.js');
fs = require('fs');
module.exports = {
  get_rentals: {
    get: (renter_id, callback) => {

      const query = {
        text: `SELECT title, concat_ws(' ',firstName, lastName) as owner, owner_id, items.item_id, rate, pickupdate, returndate, photos FROM transactions, users,items  WHERE renter_id = $1 AND users.user_id = transactions.owner_id AND items.item_id = transactions.item_id`,
        values: [renter_id]
      };
      return client.query(query)
        .catch (err => console.log('err@models-post-item', err))
        .then((databaseStuff)=>{
          callback(null, databaseStuff.rows);
        });

    },
  },
  get_listings: {
    get: (owner_id, callback) => {

      const query = {
        text: `SELECT DISTINCT title, price, nyop, min_price, items.item_id, latlng, photos FROM items JOIN transactions ON user_id = owner_id WHERE user_id = $1`,
        values: [owner_id]
      };
      return client.query(query)
        .catch (err => console.log('err@models-post-item', err)).then((databaseStuff)=>{
          callback(null, databaseStuff.rows);
        });

    },
  },
  get_data: {
    get: (table, callback) => {

      const query = {
        text: `SELECT * from items`,
        // values: [owner_id]
      };
      return client.query(query)
        .catch (err => console.log('err@models-post-item', err)).then((databaseStuff)=>{
          callback(null, databaseStuff.rows);
        }) .then((databaseStuff)=>{
          fs.writeFileSync('client/src/data/dataFunctions/items.json', JSON.stringify(databaseStuff.rows, null, 2));
          callback(null, databaseStuff.rows);
        });

    },
  },
};


// post: (userID, reqbody) => {
//   const { title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng, photos } = reqbody;
//   const query = {
//     text: 'INSERT INTO items(user_id, title, category, brand, model, itemdescription, price, nyop, min_price, availablefrom, availableto, address, latlng, photos) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
//     values: [userID, title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng, photos]
//   };
//   return client.query(query)
//     .catch (err => console.log('err@models-post-item', err));
// };