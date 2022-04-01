const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModels.js");

router.get("/", async (req, res) => {
  res.render("admin");
});

module.exports = router;
