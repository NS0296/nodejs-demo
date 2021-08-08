const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-demo", "root", process.env.MYSQLPASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

module.exports = sequelize;

const User = require("../models/user");
const Item = require("../models/item");
const Order = require("../models/order");
