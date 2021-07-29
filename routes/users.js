const path = require("path");

const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.js");

router.get("/register", usersController.getRegister);

router.post("/register", usersController.postRegister);

router.get("/login", usersController.getLogin);

router.post("/login", usersController.postLogin);

router.get("/logout", usersController.getLogout);

const isAuth = (req, res, next) => {
    //checks if user is auth. for requests that need this permission
    if (req.session.isAuth) {
        next();
    } else {
        console.log("Permission to enter dashboard is missing");
        res.redirect("/");
    }
};

router.get("/dashboard", isAuth, usersController.getUserDashboard);

module.exports = router;
