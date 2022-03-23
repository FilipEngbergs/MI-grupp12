require("dotenv").config();
require("./mongoose.js");
const express = require("express");
const exphbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user-route.js");
const cleanerRouter = require("./routes/cleaner-route.js");
const adminRouter = require("./routes/admin-route.js");

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
        res.render("userpage");
    } else {
        res.render("home");
    }
});

app.post("/logout", async (req, res) => {
    res.cookie("token", "", { maxAge: 0 });
    res.redirect("/");
});

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/cleaner", cleanerRouter);

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
