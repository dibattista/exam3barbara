var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');


module.exports.hotelsGetAll = function(req, res) {

  Hotel
    .find()
    .exec(function(err, hotels) {
      console.log(err);
      console.log(hotels);
      if (err) {
        console.log("Error finding hotels");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found hotels", hotels.length);
        res
          .json(hotels);
      }
    });

};

module.exports.hotelsGetOne = function(req, res) {
  var id = req.params.hotelId;

  console.log('GET hotelId', id);

  Hotel
    .findById(id)
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("HotelId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });

};
//////////////////////// post/////////////////////////////
var _splitArray = function(input){
  var output;
  if (input && input.length > 0) {
    output = input.split(";");
  } else {
    output = [];
  }
  return output;
};
//the method below permet de creer un tableau pour les photos et services
//vu que la creation creer des json = string il faut les convertires comme
// parseInt pour les stars
module.exports.hotelsAddOne = function(req, res) {

Hotel
  .create({
    name : req.body.name,
    description : req.body.description,
    stars : parseInt(req.body.stars, 10),
    photos : _splitArray(req.body.photos),
    currency : req.body.currency
  }, function(err, hotel) {
    if(err){
      console.log("Error creating hotel");
      res
        .status(400)
        .json(err);
    } else {
      console.log("Hotel created", hotel);
      res
        .status(201)
        .json(hotel);
    }
  });

};
/////////////////////////PUT//////////////
module.exports.hotelsUpdateOne = function(req, res) {
  var hotelId = req.params.hotelId;

  console.log('GET hotelId', hotelId);

  Hotel
    .findById(hotelId)
    .select('-reviews -rooms')
    .exec(function(err, hotel) {
      if (err) {
        console.log("Error finding hotel");
        res
          .status(500)
          .json(err);
          return;
      } else if(!hotel) {
        console.log("HotelId not found in database", hotelId);
        res
          .status(404)
          .json({
            "message" : "Hotel ID not found " + hotelId
          });
          return;
      }

      hotel.name = req.body.name;
      hotel.description = req.body.description;
      hotel.stars = parseInt(req.body.stars,10);
      hotel.photos = _splitArray(req.body.photos);
      hotel.currency = req.body.currency;
      

      hotel
        .save(function(err, hotelUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });


    });

};

///////////////////////////@ Delete///////////////////////////////
module.exports.hotelsDeleteOne = function(req, res){
  var hotelId = req.params.hotelId;

    Hotel
      .findByIdAndRemove(hotelId)
      .exec(function(err, hotel){
        if(err){
        res
          .status(404)
          .json(err);
        } else {
          console.log("Hotel deleted, id", hotelId);
          res
            .status(204)
            .json();
        }
      });
};
