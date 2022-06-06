const client = require('../database/database.js');

module.exports = {
  itemData: {
    get: (itemID) => {
      // console.log('this is itemid here', itemID);
      var result = {};
      const query = `SELECT i.item_id, i.title, i.brand, i.model, i.itemdescription, i.price, i.nyop, i.min_price, i.availablefrom, i.availableto,
      i.address, i.photos, u.firstname, u.lastname, u.email, u.userphoto, u.datejoined from items i JOIN users u on i.user_id = u.user_id WHERE item_id = ${parseInt(itemID)};`;
      return client.query(query)
        .then(data => {
          result.details = data.rows[0];
          const query = `SELECT JSON_BUILD_ARRAY(t.pickupdate, t.returndate) from transactions t where item_id = ${parseInt(itemID)};`;
          return client.query(query)
        })
        .then(data => {
          console.log('data with aggregate function', data.rows)
          result.datesBooked = data.rows;
          console.log('result right here', result)
          return result;
        })
        .catch (error => console.log('error in getting item data', error));
    },
    delete: (itemID) => {
      const query = {

      };
      return client.query(query)
        .catch (error => console.log('error in deleting item data', error));
    }
  }
};
