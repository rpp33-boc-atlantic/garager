/* eslint-disable camelcase */
const models = require('../models/postItem.models.js');

module.exports = {
  user_id: {
    post: async (req, res) => {
      let userID = req.params.user_id || 1;
      let item_posted = await models.user_id.post(userID, req.body);
      if (item_posted) {
        res.sendStatus(201);
      } else {
        res.sendStatus(500);
      }
    }
  }
};