/* eslint-disable camelcase */
const models = require('../models/postItem.models.js');
// const useMain = require('../../client/src/context/MainContext.jsx');

module.exports = {
  user_id: {
    post: async (req, res) => {
      let userID = 1; // useMain();
      let item_posted = await models.user_id.post(userID, req.body);
      if (item_posted) {
        res.sendStatus(201);
      } else {
        res.sendStatus(500);
      }
    }
  }
};