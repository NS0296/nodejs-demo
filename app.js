require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const session = require("express-session");
const store = require("./util/session"); //session store

const shop = require(path.join(__dirname, "routes", "shop.js"));
const auth = require(path.join(__dirname, "routes", "auth.js"));
const admin = require(path.join(__dirname, "routes", "admin.js"));
const errorController = require("./controllers/error.js");
const { userApi, productApi, cartApi, orderApi } = require(path.join(
    __dirname,
    "routes",
    "api",
    "index.js"
));

//config express
app.set("views", "views");
app.set("template engine", "ejs");

//run server
(() => {
    try {
        app.listen(3000);
        console.log("app is listening on http://localhost:3000/");
    } catch (err) {
        console.log(err);
    }
})();

//the middleware
app.use(
    session({
        secret: "shhhh",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
app.use(express.static(path.join(__dirname, "public"))); //serve public
app.use(express.urlencoded({ extended: false })); //parser for urlencoded data
app.use(express.json()); //parser for json

app.use(shop);
app.use(auth);
app.use("/api/user", usersApi);
app.use("/api/product", productsApi);
app.use("/api/cart", cartsApi);
app.use("/api/order", ordersApi);
app.use("/admin", admin);
app.use(errorController);
