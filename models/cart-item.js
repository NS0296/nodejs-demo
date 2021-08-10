const { Sequelize } = require("sequelize"); //import sequlize for datatypes
const sequelize = require("../util/database"); //import connection object

const Cart = require("../models/cart");
const Item = require("../models/item");

const CartItem = sequelize.define("CartItem", {
    CartId: {
        type: Sequelize.INTEGER,
        references: {
            model: Cart,
            key: "id",
        },
    },
    ItemId: {
        type: Sequelize.INTEGER,
        references: {
            model: Item,
            key: "id",
        },
    },
    quantity: {
        type: Sequelize.INTEGER,
        /*allowNull: false,*/
        default: 1,
    },
});

module.exports = CartItem;
