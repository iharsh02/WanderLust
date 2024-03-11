const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchmema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchmema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchmema);
