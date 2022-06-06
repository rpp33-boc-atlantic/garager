const db = require('../database/database.js');

module.exports = {

  threads: {

    get: async (email) => {
      let query = `select user_id from users where email ilike '${email}'`;
      let result = await db.query(query);
      let userId = result.rows[0].user_id;

      query = `select * from threads where (owner_id = ${userId} or renter_id = ${userId})`;
      return db.query(query);
    },

    post: async (thread) => {
      let query = 'select user_id from items where item_id=' + thread.itemId;
      let result = await db.query(query);
      let ownerId = result.rows[0].user_id;

      query = `insert into threads
               (item_id, owner_id, renter_id, owner_viewed, renter_viewed, time_updated)
               values($1, $2, $3, $4, $5, $6)`;

      const values = [ thread.itemId, ownerId, thread.renterId, false, false, thread.timeUpdated ];
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
      let query = `select user_id from users where email ilike '${message.email}'`;
      let result = await db.query(query);
      let userId = result.rows[0].user_id;

      query = `insert into messages
               (thread_id, user_id, text, image_url, time_created)
               values($1, $2, $3, $4, $5)`;

      let values = [ message.threadId, userId, message.text, null, message.timeCreated ];
      await db.query(query, values);

      query = `update threads
               set last_message=$1, time_updated=$2
               where thread_id=$3`;

      values = [ message.text, message.timeCreated, message.threadId ];
      db.query(query, values);
    }
  },

  productInfo: {

    get: async (itemId) => {
      const query = 'select title from items where item_id = ' + itemId;
      return db.query(query);
    }
  },

  userInfo: {

    get: async (userId, email) => {

      if (userId !== null) {
        const query = 'select firstname, lastname, email from users where user_id = ' + userId;
        return db.query(query);

      } else {
        const query = `select firstname, lastname, user_id from users where email ilike '${email}'`;
        return db.query(query);
      }
    }
  }
};