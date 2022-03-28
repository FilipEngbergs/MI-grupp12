const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const bookingSchema = require("../models/Booking");

router.use((req, res, next) => {
  const { token } = req.cookies;

  if (token && jwt.verify(token, process.env.JWTSECRET)) {
    const tokenData = jwt.decode(token, process.env.JWTSECRET);
    res.locals.loggedIn = true;
    res.locals.username = tokenData.email;
  } else {
    res.locals.loggedIn = false;
  }
  next();
});

router.get("/", async (req, res) => {
  const { token } = req.cookies;

  if (token && jwt.verify(token, process.env.JWTSECRET)) {
    const tokenData = jwt.decode(token, process.env.JWTSECRET);
    const userName = tokenData.name;
    res.render("userpage", { userName });
  } else {
    res.render("home");
  }
});

router.post("/new-booking", async (req, res) => {
  const { token } = req.cookies;

  if (token && jwt.verify(token, process.env.JWTSECRET)) {
    const tokenData = jwt.decode(token, process.env.JWTSECRET);
    const userId = tokenData._id;

    const newBooking = new bookingSchema({
      description: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      },
      address: {
        street: req.body.street,
        streetnumber: req.body.streetnumber,
        zipcode: req.body.zipcode,
        postaladdress: req.body.postaladdress,
      },
      date: req.body.date,
      time: req.body.time,
      customer: userId,
    });

    try {
      await newBooking.save();

      const successfulBooking = "The booking was completed!";
      res.render("userpage", { successfulBooking });
    } catch {
      const validationError =
        "You probably missed a field! Fill in all the fields above.";
      res.render("userpage", { validationError });
    }
  } else {
    res.send("Could not find user token!");
  }
});

router.post("/logout", async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.redirect("/");
});

module.exports = router;
