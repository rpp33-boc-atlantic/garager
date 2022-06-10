const models = require('../models/itemView.models.js');

module.exports = {
  itemData: {
    get: (req, res) => {
      // console.log('request here', req.query.ID.substring(3));
      let itemID = req.query.ID.substring(3);
      models.itemData.get(itemID)
        .then(data => {
          if (data.details === undefined) {
            res.status(404).send({ 'message': 'Error 404 Item Not Found'});
          } else {
            res.status(200).send(data);
          }
        })
        .catch(error => {
          res.status(500).send(error);
        });
    },
    delete: (req, res) => {
      let itemID = req.body.ID;
      console.log('item id is here in delete controller', req.body.ID);
      models.itemData.delete(itemID)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(error => {
          res.status(500).send(error);
        });
    }
  }
};
