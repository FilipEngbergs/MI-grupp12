const { Schema, model } = require("mongoose");

const BookingSchema = new Schema({
  description: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    streetnumber: {
      type: Number,
      required: true,
    },
    zipcode: {
      type: Number,
      required: true,
    },
    postaladdress: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  cleaner: {
    type: Schema.Types.ObjectId,
    ref: "Cleaners",
  },
  status: {
    unconfirmed: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    booked: { type: Boolean, default: false },
    underconstruction: { type: Boolean, default: false },
    performed: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    invoiced: { type: Boolean, default: false },
    paid: { type: Boolean, default: false },
  },
});

const BookingModel = model("Booking", BookingSchema);

module.exports = BookingModel;
