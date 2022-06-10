/* eslint-disable camelcase */
const models = require('../models/postItem.models.js');

module.exports = {
  user_id: {
    post: async (req, res) => {
      let item_posted = await models.user_id.post(req.body);
      if (item_posted) {
        res.sendStatus(201);
      } else {
        res.sendStatus(500);
      }
    }
  }
};