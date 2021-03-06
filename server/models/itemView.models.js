const client = require('../database/database.js');

module.exports = {
  itemData: {
    get: (itemID) => {
      // console.log('this is itemid here', itemID);
      var result = {};
      const query = `SELECT i.item_id, i.user_id, i.title, i.brand, i.model, i.itemdescription, i.price, i.nyop, i.min_price, i.availablefrom, i.availableto,
      i.address, i.photos, u.firstname, u.lastname, u.email, u.userphoto, u.datejoined from items i JOIN users u on i.user_id = u.user_id WHERE item_id = ${parseInt(itemID)};`;
      return client.query(query)
        .then(data => {
          result.details = data.rows[0];
          const query = `SELECT JSON_BUILD_ARRAY(t.pickupdate, t.returndate) from transactions t where item_id = ${parseInt(itemID)};`;
          return client.query(query);
        })
        .then(data => {
          result.datesBooked = data.rows;
          return result;
        });
    },
    delete: (itemID) => {
      const query = `DELETE FROM items where item_id=${itemID}`;
      return client.query(query)
        .catch (error => console.log('error in deleting item data', error));
    }
  }
};
