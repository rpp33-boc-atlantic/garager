/* eslint-disable camelcase */
const client = require('../database/database.js');
fs = require('fs');
module.exports = {
  rentals: {
    get: (renter_id, callback) => {

      const query = {
        text: `SELECT title, concat_ws(' ',firstName, lastName) as owner, owner_id,transaction_id, items.item_id, rate, pickupdate, returndate, photos FROM transactions, users,items  WHERE renter_id = $1 AND users.user_id = transactions.owner_id AND items.item_id = transactions.item_id`,
        values: [renter_id]
      };
      return client.query(query)
        .catch (err => console.log('err@models-post-item', err))
        .then((databaseStuff)=>{
          callback(null, databaseStuff.rows);
        });
    }
  },
  listings: {
    get: (owner_id, callback) => {

      const query = {
        text: `SELECT DISTINCT title, price, nyop, min_price, items.item_id, to_jsonb(latlng), photos FROM items JOIN transactions ON user_id = owner_id WHERE user_id = $1`,
        values: [owner_id]
      };
      return client.query(query)
        .catch (err => console.log('err@models-post-item', err))
        .then((data)=>{
          callback(null, data.rows);
        });

    },
  },
  earnings: {
    get: (owner_id, callback) => {
      const query = {
        text: `WITH  week as(
          SELECT
          sum(rate) AS weekly, count(rate) AS weekly_transactions, count(DISTINCT item_id) as weekly_items
          FROM transactions
          WHERE returndate BETWEEN
          NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7
          AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER
          AND owner_id = $1
          GROUP BY owner_id
         ),month as(
         SELECT
          sum(rate) AS monthly, count(rate) AS monthly_transactions, count(DISTINCT item_id) as monthly_items
          FROM transactions
          WHERE returndate BETWEEN
          NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-30
          AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER
          AND owner_id = $1
          GROUP BY owner_id
         ),totalearnings as
         (
           SELECT
            sum(rate) AS total, count(rate) AS total_transactions, count(DISTINCT item_id) as total_items,
            owner_id
            FROM transactions
            WHERE owner_id = $1
            GROUP BY owner_id
           )
         SELECT monthly, weekly, total, owner_id, total_transactions,monthly_transactions,weekly_transactions,weekly_items,monthly_items,total_items
         FROM month, week, totalearnings;`,
        values: [owner_id]
      };
      return client.query(query)
        .catch (err => console.log('err@models-post-item', err))
        .then((data)=>{
          console.log('earnings', data.rows);
          callback(null, data.rows);
        });
    },
  },
  profile: {
    get: (user_id, callback) => {
      const query = {
        text: `SELECT * from users where user_id = $1`,
        values: [user_id]
      };
      return client.query(query)
        .catch (err => console.log('err@models-post-item', err))
        .then((databaseStuff)=>{
          callback(null, databaseStuff.rows);
        });
    },
  },
  data: {
    get: (table, callback) => {

      const query = {
        text: `SELECT * from ${table}`,
        // values: [owner_id]
      };
      return client.query(query)
        .catch (err => console.log('err@models-post-item', err))
        .then((databaseStuff)=>{
          // console.log('');
          fs.writeFileSync(`client/src/data/dataFunctions/${table}.json`, JSON.stringify(databaseStuff.rows, null, 2));
          callback(null, databaseStuff.rows);
        });
    },
  }


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
// /+ COALESCE(col2,0)

// SELECT
//  sum(rate) AS total,
//  owner_id
//  FROM transactions
//  WHERE owner_id = 7
//  GROUP BY owner_id;





// //  AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER
