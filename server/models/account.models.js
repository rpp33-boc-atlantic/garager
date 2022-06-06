/* eslint-disable camelcase */
const client = require('../database/database.js');

module.exports = {
  get_rentals: {
    get: (itemId, callback) => {
      // get stuff from database
      // const { title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng, photos } = reqbody;
      console.log('itemId', itemId);
      const query = {
        text: `Select * FROM transactions WHERE renter_id = $1`,
        // values: [userID, title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng, photos]
        values: [itemId]
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