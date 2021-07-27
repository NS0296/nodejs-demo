//tune the css
const path = require("path");

const express = require("express");
const app = express();
const sequelize = require("./util/database");
const session = require("express-session");
const store = require("./util/session");

//config express
app.set("views", "views");
app.set("template engine", "ejs");

app.use(
    session({
        secret: "shhhh",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("success, hooraay");
        app.listen(3000, console.log("app is listening"));
    } catch (err) {
        console.log(err);
    }
})();

//import routers
const adminRouter = require(path.join(__dirname, "routes", "admin.js"));
const usersRouter = require(path.join(__dirname, "routes", "users.js"));
const dashboardRouter = require(path.join(__dirname, "routes", "dashboard.js"));

//the middleware
app.use(express.static(path.join(__dirname, "public"))); //serve public
app.use(express.urlencoded({ extended: false })); //body parser

//  home page
app.get("/", (req, res, next) => {
    if ("isAuth" in req.session) {
        res.render("home.ejs", { isAuth: req.session.isAuth });
    } else {
        res.render("home.ejs", { isAuth: false });
    }
});

//  external routers
app.use("/admin", adminRouter);
app.use(usersRouter);
app.use("/dashboard", dashboardRouter);

//  catch all
app.get("/", (req, res, next) => {
    res.status(404).render("404.ejs");
});
