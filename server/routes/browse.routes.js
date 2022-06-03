const router = require('express').Router();
const controller = require('../controllers/browse.controllers.js');

// Connect controller methods to their corresponding routes
router.get('/location', controller.location.get);

module.exports = router;