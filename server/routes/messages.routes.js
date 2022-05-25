const router = require('express').Router();
const controller = require('../controllers/example.controllers.js');

// Connect controller methods to their corresponding routes
// router.get('/', controller.example.get);

router.get('/testing', (req, res) => {
  res.send('hi');
});

module.exports = router;