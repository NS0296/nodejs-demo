const { Sequelize } = require("sequelize"); //import sequlize for datatypes
const sequelize = require("../util/database"); //import connection object

const Cart = sequelize.define("Cart", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
});

module.exports = Cart;
