const router = require('express').Router();
const controller = require('../controllers/postItem.controllers.js');

// Connect controller methods to their corresponding routes
router.post('/', controller.user_id.post);

module.exports = router;