const db = require('../database/database.js');

module.exports = {
  threads: {
    get: async () => {
      const query = 'select * from threads';
      return await db.query(query);
    },
    post: async (thread) => {
      const query = `insert into threads
                     (item_id, owner_id, renter_id, owner_viewed, renter_viewed, time_updated)
                     values($1, $2, $3, $4, $5, $6)`;
      const values = [ thread.itemId, thread.ownerId, thread.renterId, false, false, thread.timeUpdated ];
      return await db.query(query, values);
    },
    put: () => {}
  },
  messages: {
    get: async (threadId) => {
      const query = 'select * from messages where thread_id=' + threadId;
      return await db.query(query);
    },
    post: async (message) => {
      let query = `insert into messages
                   (thread_id, user_id, text, image_url, time_created)
                   values($1, $2, $3, $4, $5)`;
      let values = [ message.threadId, 1, message.text, null, message.timeCreated ];
      await db.query(query, values);

      query = `update threads
              set last_message=$1, time_updated=$2
              where thread_id=$3`;
      values = [ message.text, message.timeCreated, message.threadId ];
      db.query(query, values);
    }
  }
};