const { Sequelize, DATE } = require("sequelize"); //import sequlize for datatypes
const sequelize = require("../util/database"); //import connection object

sequelize.define("Order", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
});
