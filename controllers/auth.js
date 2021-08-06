const User = require("../models/user.js");
const rootDir = require("../util/path.js");
const secrets = require("../secrets.json");
const path = require("path");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const ejs = require("ejs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const Sequelize = require("sequelize");

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: secrets.sendgridApiKey,
        },
    })
);

exports.getRegister = (req, res, next) => {
    res.render("auth/user-register.ejs", {
        pageTitle: "Register",
        isAuth: req.session.isAuth,
        path: "/register",
    });
};

exports.postRegister = async (req, res, next) => {
    const { username, email, password, phone, address } = req.body;
    res.redirect("/login");
    try {
        const isUserExist = await User.findOne({ where: { email: email } });
        if (isUserExist !== null) {
            throw new Error("User already exists");
        }
        const hashPassword = await bcrypt.hash(password, 4);
        await transporter.sendMail({
            to: email,
            from: secrets.sendgridMainSender,
            subject: "Sign up succeed0",
            html: "<h1>hey hey hey</h1>",
        });
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
            from: secrets.sendgridMainSender,
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
            from: secrets.sendgridMainSender,
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
