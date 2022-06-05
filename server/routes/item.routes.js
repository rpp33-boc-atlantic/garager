const router = require('express').Router();
const controller = require('../controllers/item.controllers.js');

// Connect controller methods to their corresponding routes
// const bodyParser = require('body-parser');

router.get('/itemData', controller.itemData.get);
router.delete('/itemData', controller.itemData.delete);

module.exports = router;