/* This is an example file for where we can put the ROUTES for our particular feature. The code below is just an example and will be different for each feature!

file naming example: accounts.routes.js, postItem.routes.js (you can name it as you wish)
*/
const router = require('express').Router();
const controller = require('../controllers/account.controllers.js');

// Connect controller methods to their corresponding routes
router.get('/my-rentals/', controller.rentals.get);

router.get('/my-earnings/', controller.earnings.get);
router.get('/my-profile', controller.profile.get);


// router.get('/my-listings/earnings', controller.earnings.get);

router.get('/my-listings', controller.listings.get);

router.get('/get-data', controller.data.get);

module.exports = router;


