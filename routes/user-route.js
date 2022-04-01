const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModels.js");

router.get("/register", async (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { email, password, confirmPassword, name, street, zipcode, town } =
    req.body;

  const newUser = new UserModel({
    email: email,
    password: password,
    name: name,
    adress: {
      street: street,
      zipcode: zipcode,
      town: town,
    },
  });
  await newUser.save();
  res.redirect("/");
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  UserModel.findOne(
    {
      email,
      password,
    },
    (e, user) => {
      if (user) {
        const userData = {
          _id: user._id.toString(),
          email: user.email,
          name: user.name,
          bookings: user.bookings,
        };
        const accessToken = jwt.sign(userData, process.env.JWTSECRET);
        res.cookie("token", accessToken);

        res.redirect("/");
      } else {
        const errorMessage = "Sorry! Username and password don't match.";
        res.render("login", { errorMessage });
      }
    }
  );
});

router.get("/seed-admin", async (req, res) => {
  const newUser = new UserModel({
    email: "admin@admin.se",
    password: "123",
    name: "Admin",
    adress: {
      street: "boulevard 123",
      zipcode: "12345",
      town: "Ankeborg",
    },
    admin: true,
  });
  await newUser.save();
  console.log(newUser);

  res.redirect("/");
});

module.exports = router;
