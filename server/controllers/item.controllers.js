module.exports = {
  itemData: {
    get: (req, res) => {
      // console.log('request here', req.query.ID);
      res.status(200).send('this route will send back all item info');
      /* models.example.get(itemId, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(data);
        }
      });*/

    },
    delete: (req, res) => {
      console.log('item id is', req.body.ID);
      res.status(200).send('this route will send back all item info');
    }
  }
};