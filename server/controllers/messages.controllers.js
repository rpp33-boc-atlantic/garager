const models = require('../models/messages.models.js');

module.exports = {
  threads: {
    get: (req, res) => {
      models.threads.get();
      res.send('test');
    },
    post: (req, res) => {
      models.threads.post(req.body);
      res.send('test');
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