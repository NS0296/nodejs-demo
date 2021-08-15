const pool = require("../util/database").promisePool;

class Product {
    constructor(title, categoryName, price, stock) {
        this.title = title;
        this.categoryName = categoryName;
        this.price = price;
        this.stock = stock;
    }

    static pool = pool;

    get pool() {
        return User.pool;
    }

    static findAll(filters) {
        if (filters === undefined) filters = {}; //prevent error incase no arg. is passed
        return this.pool.execute("CALL get_all_users(?, ?, ?, ?, ?);", [
            filters.id || null,
            filters.title || null,
            filters.categoryName || null,
            filters.price || null,
            filters.stock || null,
        ]);
    }
}

module.exports = Product;

// const { Sequelize } = require("sequelize"); //import sequlize for datatypes
// const sequelize = require("../util/database"); //import connection object

// const Item = sequelize.define("Item", {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         unique: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     name: {
//         type: Sequelize.STRING(50),
//         inNull: false,
//     },
//     categoryName: {
//         type: Sequelize.STRING(30),
//         isNull: false,
//     },
//     manufacture: {
//         type: Sequelize.STRING(40),
//         isNull: false,
//     },
//     price: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//     },
//     stockAvailable: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//     },
//     dateFirstAvailable: {
//         type: Sequelize.DATE,
//         isNull: false,
//     },
// });

// module.exports = Item;
