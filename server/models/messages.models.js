const db = require('../database/database.js');

module.exports = {
  threads: {
    get: async () => {
      const query = 'select * from threads';
      return await db.query(query);
    },
    post: (thread) => {
      const query = `insert into threads
                     (item_id, owner_id, renter_id, owner_viewed, renter_viewed, time_updated)
                     values($1, $2, $3, $4, $5, $6)`;
      const values = [ thread.itemId, thread.ownerId, thread.renterId, false, false, thread.timeUpdated ];
      db.query(query, values);
    },
    put: () => {}
  },
  messages: {
    post: (message) => {
      debugger;
    }
  }
};