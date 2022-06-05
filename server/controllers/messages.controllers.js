const models = require('../models/messages.models.js');

module.exports = {
  threads: {
    get: async (req, res) => {
      const result = await models.threads.get();
      const newThreads = [];
      let newThread, threadMessages;
      for (let thread of result.rows) {
        threadMessages = await models.messages.get(thread.thread_id);
        newThread = {
          threadId: thread.thread_id,
          itemName: 'item name',
          itemImageUrl: null,
          username: 'user name',
          userImageUrl: null,
          userRole: 'user role',
          lastMessage: thread.last_message === 'null' ? null : thread.last_message,
          timeUpdated: parseInt(thread.time_updated),
          viewed: false,
          messages: threadMessages.rows
        };
        newThreads.push(newThread);
      }
      res.send(newThreads);
    },
    post: async (req, res) => {
      await models.threads.post(req.body);
      res.end();
    },
    put: (req, res) => {
      models.threads.put();
      res.send('test');
    }
  },
  messages: {
    post: (message) => {
      models.messages.post(message);
    }
  }
};