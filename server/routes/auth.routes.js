const router = require('express').Router();
const controller = require('../controllers/auth.controllers.js');

router.post('/', controller.registerUser.post);
router.get('/', controller.registerUser.get);
module.exports = router;