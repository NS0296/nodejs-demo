//tune the css
const path = require("path");

const express = require("express");
const app = express();
const sequelize = require("./util/database");
const session = require("express-session");

//config express
app.set("views", "views");
app.set("template engine", "ejs");

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("success, hooraay");
        app.listen(3000, console.log("app is listening"));
    } catch (err) {
        console.log(err);
    }
};

start();

app.use(
    session({
        secret: "shhhh",
        resave: false,
        saveUninitialized: false,
    })
);

//import routers
const homeRouter = require(path.join(__dirname, "routes", "home.js"));
const adminRouter = require(path.join(__dirname, "routes", "admin.js"));
const usersRouter = require(path.join(__dirname, "routes", "users.js"));

//the middleware
app.use(express.static(path.join(__dirname, "public"))); //serve public
app.use(express.urlencoded({ extended: false })); //body parser

//  home page
app.use(homeRouter);

//  external routers
app.use("/admin", adminRouter);
app.use(usersRouter);

//  catch all
app.use("/", (req, res, next) => {
    res.status(404).render("404.ejs");
});

//module.exports = store;
