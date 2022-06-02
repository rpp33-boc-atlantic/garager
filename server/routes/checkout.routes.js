const router = require('express').Router();
const controller = require('../controllers/checkout.controllers.js');

// Connect controller methods to their corresponding routes
router.post('/create-session', controller.checkoutSession.post);
router.post('/onboard-user', controller.onboardUser.post);
router.get('/onboard-user/refresh', controller.onboardUser.get);

module.exports = router;