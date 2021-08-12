//this block is not commented out for now because express session uses sequelize
const Sequelize = require("sequelize");
const mysql = require("mysql2");

const sequelize = new Sequelize("node-demo", "root", process.env.MYSQLPASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.MYSQLPASSWORD,
    database: "nodejs-demo-new",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

exports.promisePool = pool.promise();
module.exports = sequelize;

// const User = require("../models/user");
// const Item = require("../models/item");
// const Cart = require("../models/cart");
// const CartItem = require("../models/cart-item");
// const Order = require("../models/order");
// const OrderItem = require("../models/order-item");

// //initialize relationships
// User.hasMany(Order, {
//     onDelete: "RESTRICT",
//     onUpdate: "NO ACTION",
//     foreignKey: {
//         allowNull: false,
//     },
// });
// Order.belongsTo(User);

// User.hasOne(Cart, {
//     onDelete: "NO ACTION",
//     onUpdate: "NO ACTION",
//     foreignKey: {
//         allowNull: false,
//     },
// });
// Cart.belongsTo(User);

// Cart.belongsToMany(Item, { through: CartItem });
// Item.belongsToMany(Cart, { through: CartItem });

// Order.belongsToMany(Item, { through: OrderItem });
// Item.belongsToMany(Order, { through: OrderItem });
