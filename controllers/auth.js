const User = require("../models/user.js");
const rootDir = require("../util/path.js");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const ejs = require("ejs");
const Sequelize = require("sequelize");
const transporter = require("../util/sendgrid.js");

exports.getRegister = (req, res, next) => {
    res.render("auth/user-register.ejs", {
        pageTitle: "Register",
        isAuth: req.session.isAuth,
        path: "/register",
    });
};

exports.postRegister = async (req, res, next) => {
    const { username, email, password, phone, home_address } = req.body;
    res.redirect("/login");
    try {
        const [isEmailExist] = await User.findAll({ email: email });
        if (isEmailExist[0].length) {
            throw new Error("User already exists");
        }
        const mailHtml = await ejs.renderFile(
            path.join(rootDir, "views", "email", "welcome.ejs"),
            { email: email, username: username }
        );
        await transporter.sendMail({
            to: email,
            from: process.env.SENDGRID_SENDER_MAIN,
            subject: "Thanks for Signing Up",
            html: mailHtml,
        });
        const hashPassword = await bcrypt.hash(req.body.password, 4);
        const user = new User(username, email, hashPassword, phone, home_address);
        await user.save();
        // const isCartExist = await user.getCart();
        // if (isCartExist === null) {
        //     user.createCart();
        // }
    } catch (err) {
        console.log(err);
    }
};

exports.getLogin = (req, res, next) => {
    res.render("auth/user-login.ejs", {
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

exports.getReset = (req, res, next) => {
    res.render("auth/reset.ejs", {
        pageTitle: "Reset Password",
        path: "/reset",
        isAuth: req.session.isAuth,
    });
};
exports.postReset = async (req, res, next) => {
    const { email } = req.body;
    res.redirect("/login");
    try {
        const token = await crypto.randomBytes(15).toString("hex");
        const user = await User.findOne({ where: { email: email } });
        const updateUser = await User.update(
            {
                resetToken: token,
                resetTokenExpiration: Date.now() + 36000000,
            },
            {
                where: { email: email },
            }
        );
        if (updateUser[0] === 0) {
            throw new Error("User does not exist");
        }
        const mailHtml = await ejs.renderFile(
            path.join(rootDir, "views", "email", "reset-password.ejs"),
            {
                username: user.username,
                email: email,
                resetToken: token,
            }
        );
        const mail = await transporter.sendMail({
            from: process.env.SENDGRID_SENDER_MAIN,
            to: email,
            subject: "Reset password",
            html: mailHtml,
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getNewPassword = async (req, res, next) => {
    const resetToken = req.params.resetToken;
    let user;
    try {
        user = await User.findOne({
            where: {
                resetToken: resetToken,
                resetTokenExpiration: { [Sequelize.Op.gt]: Date.now() },
            },
        });
        if (user === null) {
            throw new Error("Reset Token is invalid");
        }
    } catch (err) {
        console.log(err);
    }
    res.render("auth/new-password.ejs", {
        userId: user.id,
        resetToken: resetToken,
        pageTitle: "New Password",
        path: "/new-password",
        isAuth: req.session.isAuth,
    });
};

exports.postNewPassword = async (req, res, next) => {
    const { userId, resetToken, password } = req.body;
    try {
        const user = await User.findOne({
            where: {
                id: userId,
                resetToken: resetToken,
                resetTokenExpiration: { [Sequelize.Op.gt]: Date.now() },
            },
        });
        const hashNewPassword = await bcrypt.hash(password, 4);
        user.update({
            password: hashNewPassword,
            resetToken: null,
            resetTokenExpiration: null,
        });
        res.render("auth/user-login.ejs", {
            pageTitle: "Login",
            isAuth: req.session.isAuth,
            path: "/login",
        });
        const mailHtml = await ejs.renderFile(
            path.join(rootDir, "views", "email", "new-password-success.ejs"),
            {
                username: user.username,
            }
        );
        const mail = await transporter.sendMail({
            from: process.env.SENDGRID_SENDER_MAIN,
            to: user.email,
            subject: "Reset password succesful",
            html: mailHtml,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getUserDashboard = async (req, res, next) => {
    try {
        const { username, email, phone, address } = await User.findByPk(
            req.session.userId
        );
        res.render("auth/dashboard.ejs", {
            username: username,
            email: email,
            phone: phone,
            address: address,
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
    res.redirect("/");
};
