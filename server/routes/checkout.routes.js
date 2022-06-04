const router = require('express').Router();
const controller = require('../controllers/checkout.controllers.js');
const express = require('express'); // needed for webhook

// Connect controller methods to their corresponding routes
router.post('/create-session', controller.checkoutSession.post);
router.post('/onboard-user', controller.onboardUser.post);
router.get('/onboard-user/refresh', controller.onboardUser.get);
router.get('/check-account-completion', controller.checkAccountCompletion.get);
router.post('/webhook', express.raw({type: 'application/json'}), controller.webhook.post);

module.exports = router;