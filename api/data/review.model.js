var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
  hotelId: {
      type: String,
      required: true
  },
  name : {
    type : String,
    required : true
  },
  rating : {
    type : Number,
    min : 0,
    max : 5,
    required : true
  },
  review : {
    type : String,
    required : true
  },
  createOn : {
    type : Date,
    "default" : Date.now
  }
});

mongoose.model("Review", reviewSchema);
