/* eslint-disable camelcase */
const client = require('../database/database.js');
const fs = require('fs');
module.exports = {
  // returns all transactions for a user
  rentals: {
    get: (renter_id, callback) => {

      const query = {
        text: `SELECT title, concat_ws(' ',firstName, lastName) as owner, owner_id,transaction_id, items.item_id, rate, pickupdate, returndate, refunded, photos FROM transactions, users,items  WHERE renter_id = $1 AND users.user_id = transactions.owner_id AND items.item_id = transactions.item_id`,
        values: [renter_id]
      };
      return client.query(query)
        .then((databaseStuff)=>{
          callback(null, databaseStuff.rows);
        })
        .catch (err => {
          // console.log('err@models-account-rentals');
          callback(err, null);
        });
    }
  }, // returns all items for an owner
  listings: {
    get: (owner_id, callback) => {

      const query = {
        text: `SELECT DISTINCT title, price, nyop, min_price, items.item_id, to_jsonb(latlng), photos FROM items JOIN transactions ON user_id = owner_id WHERE user_id = $1`,
        values: [owner_id]
      };
      return client.query(query)
        .then((data)=>{
          callback(null, data.rows);
        }).catch (err => {
          // console.log('err@models-account-listings');
          callback(err, null);
        });

    },
  },
  // return data about earnings, total number of transactions and number of items rented out in last 7 or 30 days
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
          AND refunded = false
          GROUP BY owner_id
         ),month as(
         SELECT
          sum(rate) AS monthly, count(rate) AS monthly_transactions, count(DISTINCT item_id) as monthly_items
          FROM transactions
          WHERE returndate BETWEEN
          NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-30
          AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER
          AND owner_id = $1
          AND refunded = false
          GROUP BY owner_id
         ),totalearnings as
         (
           SELECT
            sum(rate) AS total, count(rate) AS total_transactions, count(DISTINCT item_id) as total_items,
            owner_id
            FROM transactions
            WHERE owner_id = $1
            AND refunded = false
            GROUP BY owner_id
           )
         SELECT monthly, weekly, total, owner_id, total_transactions,monthly_transactions,weekly_transactions,weekly_items,monthly_items,total_items
         FROM month, week, totalearnings;`,
        values: [owner_id]
      };
      return client.query(query)
        .then((data)=>{
          // console.log('earnings', data.rows);
          callback(null, data.rows);
        })
        .catch (err => {
          // console.log('err@models-account-earnings');
          callback(err, null);
        });
    },
  },
  // returns data about any selected user
  profile: {

    get: (user_id, callback) => {
      const query = {
        text: `SELECT * from users where user_id = $1`,
        values: [user_id]
      };
      return client.query(query)
        .then((profileData)=>{
          // console.log('data', profileData);
          callback(null, profileData.rows);
        })
        .catch (err => {
          // console.log('err@models-account-profile');
          callback(err, null);
        });

    },
  },
  // writes data for a specific table to a file. default  table is provided in controller.
  data: {
    get: (table, writeTable, callback) => {

      var text = 'SELECT * from ' + table;
      const query = {
        text: text
      };
      return client.query(query)
        .then((data)=>{
        //uncomment if you want to download tables
          // if (writeTable) {
          //   fs.writeFileSync(`client/src/data/dataFunctions/${table}.json`, JSON.stringify(data.rows, null, 2));
          // }
          callback(null, data.rows);
        })
        .catch (err => {
          // console.log('err@models-account-data');
          callback(err, null);
        });
    },
  }


};

