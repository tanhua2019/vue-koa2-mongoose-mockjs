const mongoose = require("mongoose");
const Shema = mongoose.Schema;

const User = mongoose.model(
  "user",
  new Shema({
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }
  })
);

module.exports = User;
