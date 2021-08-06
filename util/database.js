const Sequelize = require("sequelize");
const secrets = require("../secrets.json");

const sequelize = new Sequelize("node-demo", "root", secrets.mysqlPassword, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

module.exports = sequelize;
