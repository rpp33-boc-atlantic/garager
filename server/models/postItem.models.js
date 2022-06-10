/* eslint-disable camelcase */
const pool = require('../database/database.js');

module.exports = {
  user_id: {
    post: (reqbody) => {
      const { userId, title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng, photosArr } = reqbody;
      const query = {
        text: 'INSERT INTO items(user_id, title, category, brand, model, itemdescription, price, nyop, min_price, availablefrom, availableto, address, latlng, photos) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)',
        values: [userId, title, category, brand, model, itemDescription, price, nameYourOwnPrice, minimunAcceptedPrice, availableFrom, availableTo, address, latLng, photosArr]
      };
      return pool.query(query)
        .catch (err => console.log('err@models-post-item', err));
    }
  }
};