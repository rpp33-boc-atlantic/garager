const router = require('express').Router();
const controller = require('../controllers/auth.controllers.js');

router.post('/', controller.registerUser.post);


module.exports = router;