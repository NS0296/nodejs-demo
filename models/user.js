//this file is responsible for the connection to the database
//and inserting values into each table
const { Sequelize, DATE } = require("sequelize"); //import sequlize for datatypes
const sequelize = require("../util/database"); //import connection object

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
        type: Sequelize.STRING(11),
        isNull: true,
        defaultValue: null,
    },
    address: {
        type: Sequelize.STRING(50),
        isNull: true,
        defaultValue: null,
    },
    resetToken: {
        type: Sequelize.STRING(30),
        isNull: true,
        default: null,
    },
    resetTokenExpiration: {
        type: Sequelize.DATE,
        isNull: true,
        default: null,
    },
});

module.exports = sequelize.models.User;
