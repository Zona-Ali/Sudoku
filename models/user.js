const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose').default;

const userschema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  timeL1: {
    type: Number,
    default: 0
  },
  timeL2: {
    type: Number,
    default: 0
  },
  timeL3: {
    type: Number,
    default: 0
  },
  timeL4: {
    type: Number,
    default: 0
  },
});

userschema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userschema);