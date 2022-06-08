const db = require('../database/database.js');

module.exports = {
  items: {
    get: async () => {
      let query = "SELECT " +
        "I.item_id " +
          "AS id, " +
        "I.title " +
          "AS name, " +
        "json_build_object(" +
          "'category', I.category, " +
          "'description', I.itemDescription, " +
          "'price', I.price, " +
          "'image', I.photos, " +
          "'location', I.latLng, " +
          "'availability', (json_build_object(" +
            "'startDate', extract(epoch FROM I.availableFrom), " +
            "'endDate', extract(epoch FROM I.availableTo), " +
            "'rentedDates', (SELECT " +
              "array_agg(ARRAY[T.pickUpDate, T.returnDate]) " +
                "FROM transactions T " +
                "WHERE T.item_id=I.item_id" +
              ")" +
            ")" +
          "), " +
          "'transactions', " +
          "(SELECT " +
            "COUNT(*) " +
            "FROM transactions T " +
            "WHERE T.item_id=I.item_id)" +
          ") AS details " +
        "FROM items I " +
        "GROUP BY I.item_id";
      let items = await db.query(query);
      return items;
    }
  }
};