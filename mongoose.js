const mongoose = require("mongoose");

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
  console.log("Connected to DB!");
});
