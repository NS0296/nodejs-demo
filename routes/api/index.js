//all api routes are imported here
//so that index.js is the only imported file in app.js

const users = require("./users");
const items = require("./items");
const carts = require("./cart");

exports.usersApi = users;
exports.itemsApi = items;
exports.cartsApi = carts;
