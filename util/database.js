const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-demo", "root", "***REMOVED***", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
