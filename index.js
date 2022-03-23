require("dotenv").config();
require("./mongoose.js");
const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user-route.js");

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

app.use((req, res, next) => {
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

app.get("/", async (req, res) => {
    const { token } = req.cookies;

    if (token && jwt.verify(token, process.env.JWTSECRET)) {
        const tokenData = jwt.decode(token, process.env.JWTSECRET);
        res.send("still logged in as " + tokenData.email);
    } else {
        res.render("home");
    }
});

app.use("/user", userRouter);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
