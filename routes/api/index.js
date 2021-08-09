//all api routes are imported here
//so that index.js is the only imported file in app.js

const users = require("./users.js");
const items = require("./items.js");

exports.usersApi = users;
exports.itemsApi = items;
