/* eslint-disable camelcase */
const client = require('../database/database.js');

module.exports = {
  get_rentals: {
    get: (renter_id, callback) => {
      // get stuff from database
      // const { title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng, photos } = reqbody;
      // console.log('itemId', itemId);
      const query = {
        text: `Select * FROM transactions WHERE renter_id = $1`,
        // values: [userID, title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng, photos]
        values: [renter_id]
      };
      return client.query(query)
        .catch (err => console.log('err@models-post-item', err)).then((databaseStuff)=>{
          callback(null, databaseStuff.rows);
        });

    },
  },
  get_listings: {
    get: (itemId, callback) => {
      // get stuff from database
      // const { title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng, photos } = reqbody;
      console.log('owner_id', itemId);
      const query = {
        text: `Select * FROM items, transactions WHERE owner_id = $1`,
        // values: [userID, title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng, photos]
        values: [owner_id]
      };
      return client.query(query)
        .catch (err => console.log('err@models-post-item', err)).then((databaseStuff)=>{
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