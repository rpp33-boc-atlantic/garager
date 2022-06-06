const router = require('express').Router();
const controller = require('../controllers/messages.controllers.js');

router.get('/threads', controller.threads.get);

router.post('/threads', controller.threads.post);

router.put('/threads', controller.threads.put);

router.get('/threads/user', controller.user.get);

module.exports = router;