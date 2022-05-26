const router = require('express').Router();
const controller = require('../controllers/checkout.controllers.js');

// Connect controller methods to their corresponding routes
router.post('/create-session', controller.checkoutSession.post);

module.exports = router;