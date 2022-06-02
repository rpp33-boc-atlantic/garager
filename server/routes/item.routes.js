const router = require('express').Router();
const controller = require('../controllers/item.controllers.js');

// Connect controller methods to their corresponding routes
// const bodyParser = require('body-parser');

router.get('/itemInfo', controller.itemInfo.get);

module.exports = router;