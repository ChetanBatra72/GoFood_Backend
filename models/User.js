// Making Schema
const mongoose = require("mongoose");
const { Schema } = mongoose; // destructing const Schema = mongoose.Schema; It's a shorthand way of referencing the Schema object from the mongoose module
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('user' , UserSchema) // wrapping up of our schema