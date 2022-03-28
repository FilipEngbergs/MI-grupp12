require("dotenv").config();
require("./mongoose.js");

const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user-route.js");
const cleanerRouter = require("./routes/cleaner-route.js");
const adminRouter = require("./routes/admin-route.js");
const homeRouter = require("./routes/home-route.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");

app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/cleaner", cleanerRouter);

app.get("/vilkor", (req, res) => {
  res.render("vilkor");
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
