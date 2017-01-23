var mongoose = require('mongoose');

var roomSchema = new mongoose.Schema({
  type : String,
  number : Number,
  description : String,
  photos : [String],
  prices : Number
});

var hotelSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  stars : {
    type : Number,
    min : 0,
    max : 5,
    "default" : 0
  },
  description : String,
  photos : [String],
  currency : String,
  rooms : [roomSchema],

});

mongoose.model('Hotel', hotelSchema, 'hotels');
