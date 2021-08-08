const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-demo", "root", process.env.MYSQLPASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

module.exports = sequelize;

const User = require("../models/user");
const Item = require("../models/item");
const Order = require("../models/order");
const OrderItem = require("../models/order-item");

//initialize relationships
User.hasMany(Order, {
    onDelete: "RESTRICT",
    onUpdate: "NO ACTION",
    foreignKey: {
        allowNull: false,
    },
});
Order.belongsTo(User);

Order.belongsToMany(Item, { through: OrderItem });
Item.belongsToMany(Order, { through: OrderItem });
