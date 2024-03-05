const mongoose = require("mongoose");

const birdSightingSchema = new mongoose.Schema({
  comName: {
    required: true,
    type: String,
  },
  obsDt: {
    type: Date,
    default: Date.now,
  },
  lat: {
    required: true,
    type: Number,
  },
  lng: {
    required: true,
    type: Number,
  },
  photo_url: {
    required: false,
    type: String,
  },
  comment: {
    required: false,
    type: String,
  },
  //pass in username to post request. ID is prefered
  author: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("birdSightings", birdSightingSchema);
