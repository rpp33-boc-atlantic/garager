/* This is an example file for where we can put the ROUTES for our particular feature. The code below is just an example and will be different for each feature!

file naming example: accounts.routes.js, postItem.routes.js (you can name it as you wish)

const router = require('express').Router();
const controller = require('../controllers/example.controllers.js');

// Connect controller methods to their corresponding routes
router.get('/', controller.example.get);

module.exports = router;
*/