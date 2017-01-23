var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');


router
  .route('/hotels')
  .get(ctrlHotels.hotelsGetAll)
  .post(ctrlHotels.hotelsAddOne);

router
    .route('/hotels/:hotelId')
    .get(ctrlHotels.hotelsGetOne)
    .put(ctrlHotels.hotelsUpdateOne)
    .delete(ctrlHotels.hotelsDeleteOne);

////////////////Reviews routes
router
  .route('/review/:hotelId')
  .get(ctrlReviews.reviewsGetAllByhotelId)
  .post(ctrlReviews.reviewsAddOne);

router
    .route('/review/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

// Authentication
    router
      .route('/users/register')
      .post(ctrlUsers.register);

      router
        .route('/users/login')
        .post(ctrlUsers.login);


module.exports = router; //exports the route
