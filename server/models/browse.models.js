const db = require('../database/database.js');

module.exports = {
  items: {
    get: async () => {
      let query = `SELECT
        I.item_id
          AS id,
        I.title
          AS name,
        json_build_object(
          'category', I.category,
          'description', I.itemDescription,
          'price', I.price,
          'image', I.photos,
          'location', I.latLng,
          'availability', (json_build_object(
            'startDate', extract(epoch FROM I.availableFrom),
            'endDate', extract(epoch FROM I.availableTo),
            'rentedDates', (SELECT
              array_agg(ARRAY[extract(epoch FROM T.pickUpDate), extract(epoch FROM T.returnDate)])
                FROM transactions T
                WHERE T.item_id=I.item_id
              )
            )
          ),
          'transactions',
          (SELECT
            COUNT(*)
            FROM transactions T
            WHERE T.item_id=I.item_id)
          ) AS details
        FROM items I
        WHERE extract(epoch FROM I.availableFrom) < extract(epoch from now())
        GROUP BY I.item_id;`;
      let items = await db.query(query);
      return items;
    }
  }
};