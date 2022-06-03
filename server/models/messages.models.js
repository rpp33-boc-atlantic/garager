const db = require('../database/database.js');

module.exports = {
  threads: {
    get: () => {},
    post: (thread) => {
      const query = `insert into threads
                     (item_id, owner_id, renter_id, owner_viewed, renter_viewed)
                     values($1, $2, $3, $4, $5)`;
      const values = [1, 1, 2, false, false];
      db.query(query, values);
    },
    put: () => {}
  },
  messages: {
    post: (message) => {}
  }
};