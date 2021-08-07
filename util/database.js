const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-demo", "root", process.env.MYSQLPASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

module.exports = sequelize;
