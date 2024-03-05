const mongoose = require("mongoose");

const dbSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  username: {
    required: false, 
    type: String, 
  }, 
  firstName: {
    required: false, 
    type: String,
  },
  lastName: {
    required: false, 
    type: String,
  }
});

//first parameter is collection name, second is collection schema
module.exports = mongoose.model("UserData", dbSchema);
