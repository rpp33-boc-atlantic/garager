const models = require('../models/itemView.models.js');

module.exports = {
  itemData: {
    get: (req, res) => {
      console.log('request here', req.query.ID.substring(3));
      let itemID = req.query.ID.substring(3);
      models.itemData.get(itemID)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(error => {
          res.status(500).send(error);
        })
        // console.log('logging here', ttr);
        // res.status(200).send('data');

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
        })

      res.status(200).send('should be deleting item info');
    }
  }
};
