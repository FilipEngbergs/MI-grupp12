const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModels.js");

router.get("/", (req, res) => {
  const { token } = req.cookies;
});

module.exports = router;
