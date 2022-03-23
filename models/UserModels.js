const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const cleanSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    cleaner: { type: Boolean, required: true, default: true },
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
