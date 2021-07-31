const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

exports.getHome = (req, res, next) => {
    if ("isAuth" in req.session) {
        res.render("home.ejs", { isAuth: req.session.isAuth, pageTitle: "Home" });
    } else {
        res.render("home.ejs", { isAuth: false, pageTitle: "Home", path: "/" });
    }
};

exports.getRegister = (req, res, next) => {
    res.render("user-register.ejs", {
        pageTitle: "Register",
        isAuth: req.session.isAuth,
        path: "/register",
    });
};

exports.postRegister = async (req, res, next) => {
    const { username, email, password, phone, address } = req.body;
    try {
        const isUserExist = await User.findOne({ where: { email: email } });
        if (isUserExist !== null) {
            throw new Error("User already exists");
        }
        const hashPassword = await bcrypt.hash(password, 4);
        User.create({
            username: username,
            email: email,
            password: hashPassword,
            phone: phone || null,
            address: address || null,
        });
    } catch (err) {
        console.log(err);
    }
    res.redirect("/");
};

exports.getLogin = (req, res, next) => {
    res.render("user-login.ejs", {
        pageTitle: "Login",
        isAuth: req.session.isAuth,
        path: "/login",
    });
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user === null) {
            throw new Error("User does not exist");
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Wrong Password");
        }
        req.session.isAuth = true;
        req.session.userId = user.get("id"); //used to view data in user dashboard
    } catch (err) {
        console.log(err);
    }

    res.redirect("/");
};

exports.getUserDashboard = async (req, res, next) => {
    try {
        const { username, email } = await User.findByPk(req.session.userId);
        res.render("dashboard.ejs", {
            username: username,
            email: email,
            pageTitle: "Dashboard",
            isAuth: req.session.isAuth,
            path: "/dashboard",
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getLogout = (req, res, next) => {
    req.session.destroy();
    res.status(301).redirect("/");
};
