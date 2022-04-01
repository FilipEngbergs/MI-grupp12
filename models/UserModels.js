const mongoose = require("mongoose");
var Bookings = require("../models/Booking");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  adress: { type: Object, required: true },
  bookings: [Bookings.schema],
  admin: { type: Boolean, default: false },
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
