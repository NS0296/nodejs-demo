require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const session = require("express-session");
const sequelize = require("./util/database").sequelize;
const store = require("./util/session"); //session store

const shop = require("./routes/shop");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const errorController = require("./controllers/error");

const userApi = require("./routes/api/user");
const productApi = require("./routes/api/product");
const cartApi = require("./routes/api/cart");
const orderApi = require("./routes/api/order");

//config express
app.set("views", "views");
app.set("template engine", "ejs");

//run server
(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(3000);
        console.log("app is listening on http://localhost:3000/");
    } catch (err) {
        console.log(err);
    }
})();

//the middleware
app.use(
    session({
        secret: process.env.SESSIONSECRET,
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
app.use("/admin", admin);
app.use("/api/user", userApi);
app.use("/api/product", productApi);
app.use("/api/cart", cartApi);
app.use("/api/order", orderApi);
app.use(errorController);
