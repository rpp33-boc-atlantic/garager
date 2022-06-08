const router = require('express').Router();
const controller = require('../controllers/checkout.controllers.js');
const express = require('express'); // needed for webhook

router.post('/create-session', controller.checkoutSession.post);
router.post('/onboard-user', controller.onboardUser.post);
router.get('/onboard-user/refresh', controller.onboardUser.get);
router.get('/check-account-completion', controller.checkAccountCompletion.get);
router.put('/refund', controller.refund.put);
router.post('/', express.raw({type: 'application/json'}), controller.webhook.post);

module.exports = router;