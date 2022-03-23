const { Schema } = require("mongoose");

const BookingSchema = Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: Number,
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  cleaner: {
    type: Schema.Types.ObjectId,
    ref: "Cleaners",
    required: true,
  },
  status: {
    unconfirmed: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    booked: { type: Boolean, default: false },
    underConstruction: { type: Boolean, default: false },
    performed: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    invoiced: { type: Boolean, default: false },
    paid: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
