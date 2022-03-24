const express = require("express");
const bookingSchema = require("../models/Booking");
const router = express.Router();

router.get("/bookings", async (req, res) => {
  const bookings = await bookingSchema.find();

  res.render("booking", bookings);
});

router.post("/new-booking", async (req, res) => {
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
    customer: req.params.id,
  });

  try {
    const savedBooking = await newBooking.save();
    res.send(savedBooking);
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
