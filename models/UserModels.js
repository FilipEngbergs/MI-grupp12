const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    adress: { type: Object, required: true },
    bookings: { type: Array },
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
