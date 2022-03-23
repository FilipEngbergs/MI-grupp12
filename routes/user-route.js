const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModels.js");

router.get("/register", async (req, res) => {
    res.render("register");
});

router.post("/register", async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    const newUser = new UserModel({
        email: email,
        password: password,
    });
    await newUser.save();
    res.redirect("/");
});

router.get("/login", async (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne(
        {
            email,
            password,
        },
        (e, user) => {
            if (user) {
                const userData = {
                    _id: user._id.toString(),
                    email,
                };
                const accessToken = jwt.sign(userData, process.env.JWTSECRET);
                res.cookie("token", accessToken);

                res.send("logged in");
            } else {
                const errorMessage =
                    "Sorry! Username and password don't match.";
                res.render("login", { errorMessage });
            }
        }
    );
});

module.exports = router;