const express = require("express");

const router = express.Router();

//checks if user is auth. for requests that need this permission
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        console.log("Permission to enter dashboard is missing");
        res.redirect("/");
    }
};

router.get("/", isAuth, (req, res, next) => {
    res.render("dashboard.ejs");
});

module.exports = router;
