const models = require('../models/messages.models.js');

module.exports = {
  threads: {
    get: async (req, res) => {
      const result = await models.threads.get();
      const newThreads = [];
      let newThread;
      for (let thread of result.rows) {
        newThread = {
          threadId: thread.thread_id,
          itemName: 'item name',
          itemImageUrl: null,
          username: 'user name',
          userImageUrl: null,
          userRole: 'user role',
          lastMessage: '',
          timeUpdated: thread.time_updated,
          viewed: false,
          messages: []
        };
        newThreads.push(newThread);
      }
      res.send(newThreads);
    },
    post: (req, res) => {
      models.threads.post(req.body);
      res.end();
    },
    put: (req, res) => {
      models.threads.put();
      res.send('test');
    }
  },
  messages: {
    post: (req, res) => {
      models.messages.post(req.body);
    }
  }
};