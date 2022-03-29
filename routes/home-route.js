const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const bookingSchema = require("../models/Booking");
const UserModel = require("../models/UserModels");

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
    const userId = tokenData._id;

    const userBooking = await UserModel.findById(userId).lean();

    const bookings = userBooking.bookings;

    res.render("userpage", { userName, bookings });
  } else {
    res.render("home");
  }
});

router.post("/", async (req, res) => {
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

      UserModel.findById(userId, function (err, user) {
        user.bookings.push(newBooking);
        user.save();
      });
      res.redirect("/");
    } catch (err) {
      console.log(err);
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
