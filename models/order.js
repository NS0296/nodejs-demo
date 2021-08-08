const { Sequelize } = require("sequelize"); //import sequlize for datatypes
const sequelize = require("../util/database"); //import connection object

const Order = sequelize.define("Order", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
});

module.exports = Order;
