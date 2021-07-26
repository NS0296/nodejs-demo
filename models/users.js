//this file is responsible for the connection to the database
//and inserting values into each table
const { Sequelize } = require("sequelize");
const sequelize = require("../util/database"); //import the connection object

sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING(50),
        isNull: false,
    },
    email: {
        type: Sequelize.STRING(100),
        isNull: false,
    },
    password: {
        type: Sequelize.STRING,
        isNull: false,
    },
    phone: {
        type: Sequelize.INTEGER,
        isNull: true,
        defaultValue: null,
    },
    address: {
        type: Sequelize.STRING(50),
        isNull: true,
        defaultValue: null,
    },
});

module.exports = sequelize.models.User;
