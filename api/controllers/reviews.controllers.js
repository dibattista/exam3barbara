var mongoose = require('mongoose');
var Review = mongoose.model('Review');
var Hotel = mongoose.model('Hotel');


// GET all reviews for a hotel
module.exports.reviewsGetAllByhotelId = function(req, res) {
  var hotelId = req.params.hotelId;
  console.log('GET reviews for hotelId', hotelId);

Hotel
  .findById(hotelId)
  .exec(function(err, review) {
      if (err) {
          console.log("Error finding review");
          res
              .status(500)
              .json(err);
      } else if (!review) {
          console.log('reviewId not found in database', hotelId);
          res
              .status(404)
              .json({
                  "Error": "Id not found"
              });
      }
      res
          .status(200)
          .json(review);
  });
};


// GET single review for a hotel
module.exports.reviewsGetOne = function(req, res) {
  var id = req.params.reviewId;
  console.log('GET review for reviewId', id);

  Review
      .findById(id)
      .exec(function(err, review) {
          if (err) {
              console.log("Error finding review");
              res
                  .status(500)
                  .json(err);
          } else if (!review) {
              console.log('ReviewId not found in database', id);
              res
                  .status(404)
                  .json({
                      "Error": "Id not found"
                  });
          }
          res
              .status(200)
              .json(review);
      });
};

//// add on review
module.exports.reviewsAddOne = function(req, res){
  var id = req.params.hotelId;
   console.log('POST review to hotelId', id);

  Review
  .create({
      hotelId: id,
      name: req.body.name,
      review: req.body.review,
      rating : parseInt(req.body.rating, 10)
  }, function(err, review) {
      if (err) {
          console.log("Error creating review");
          res
              .status(400)
              .json(err);
      } else {
          console.log("Review created", review);
          res
              .status(201)
              .json(review)
      }
  });
};

/////////////////////PUT/////////////////////////////
module.exports.reviewsUpdateOne = function(req, res){
  var id = req.params.reviewId;

  Review
    .findById(hotelId)
    .exec(function(err, review) {
        if (err) {
            console.log("Error finding review");
            res
                .status(500)
                .json(err);
            return;
        } else if (!review) {
            console.log("ReviewId not found in database", reviewId);
            res
                .status(404)
                .json(err);
            return
        }
        console.log(Date.now());

            review.name = req.body.name,
            review.review = req.body.review,
            review.rating = parseInt(req.body.rating, 10),


            review
            .save(function(err, reviewUpdated) {
                if (err) {
                    res
                        .status(500)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(review);
                }
            });
    });
  };

/////////////////////////////////@ Delete//////////////////////
module.exports.reviewsDeleteOne = function(req,res){
  var reviewId = req.params.reviewId;

  Review
  .findByIdAndRemove(reviewId)
  .exec(function(err, user) {
      if (err) {
          res
              .status(500)
              .json(err);
      } else {
          console.log("Review deleted, id: ", reviewId);
          res
              .status(201)
              .json({
                  "msg": "review deleted"
              });
      }
  });
};
