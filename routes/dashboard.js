const express = require("express");
const router = express.Router();

const User = require("../models/users");

//checks if user is auth. for requests that need this permission
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        console.log("Permission to enter dashboard is missing");
        res.redirect("/");
    }
};

router.get("/", isAuth, async (req, res, next) => {
    try {
        const { username, email } = await User.findByPk(req.session.userId);
        res.render("dashboard.ejs", { username: username, email: email });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
