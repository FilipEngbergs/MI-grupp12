require("dotenv/config");
require("./mongoose.js");

const exphbs = require("express-handlebars");

const express = require("express");
const app = express();

app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("http://localhost:8000/");
});
