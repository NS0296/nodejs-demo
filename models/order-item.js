const { Sequelize } = require("sequelize"); //import sequlize for datatypes
const sequelize = require("../util/database"); //import connection object

const Order = require("../models/order");
const Item = require("../models/item");

const OrderItem = sequelize.define("OrderItem", {
    OrderId: {
        type: Sequelize.INTEGER,
        references: {
            model: Order,
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

module.exports = OrderItem;
