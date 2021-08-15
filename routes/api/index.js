//all api routes are imported here
//so that index.js is the only imported file in app.js

const users = require("./users");
const products = require("./products");
const carts = require("./cart");
const orders = require("./orders");

exports.usersApi = users;
exports.productsApi = products;
exports.cartsApi = carts;
exports.ordersApi = orders;
