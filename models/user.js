// //this file is responsible for the connection to the database
// //and inserting values into each table

const pool = require("../util/database").promisePool;

class User {
    constructor(username, email, password, phone, homeAddress) {
        this.username = username;
        this.email = email;
        this.password = password; //Remember: restrict password access
        this.phone = phone;
        this.homeAddress = homeAddress;
    }

    static pool = pool; //connection pool

    get pool() {
        return User.pool;
    }

    static findAll(filters) {
        if (filters === undefined) filters = {}; //prevent error incase no arg. is passed
        return this.pool.execute("CALL get_all_users(?, ?, ?, ?, ?);", [
            filters.id || null,
            filters.username || null,
            filters.email || null,
            filters.phone || null,
            filters.homeAdress || null,
        ]);
    }

    static deleteByPK(id) {
        return this.pool.execute(`call delete_user_by_id(${id})`);
    }

    static updateByPK(id, newDataObj) {
        return this.pool.execute("call insert_or_update_user(?, ?, ?, ?, ?, ?);", [
            id,
            newDataObj.username || null,
            newDataObj.email || null,
            newDataObj.password || null,
            newDataObj.phone || null,
            newDataObj.home_address || null,
        ]);
    }

    static isUserExist(filters = {}) {
        return this.pool.execute("SELECT is_user_exist(?, ?)", [
            filters.userId || null,
            filters.email || null,
        ]);
    }

    save() {
        return this.pool.execute(`call insert_or_update_user(0, '${this.username}',
            '${this.email}', '${this.password}', '${this.phone}', '${this.homeAddress}')`);
    }
}

module.exports = User;

// const { Sequelize } = require("sequelize"); //import sequlize for datatypes
// const sequelize = require("../util/database"); //import connection object

// const User = sequelize.define("User", {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         unique: true,
//         autoIncrement: true,
//         allowNull: false,
//     },
//     username: {
//         type: Sequelize.STRING(50),
//         isNull: false,
//     },
//     email: {
//         type: Sequelize.STRING(100),
//         isNull: false,
//     },
//     password: {
//         type: Sequelize.STRING,
//         isNull: false,
//     },
//     phone: {
//         type: Sequelize.STRING(11),
//         isNull: true,
//         defaultValue: null,
//     },
//     address: {
//         type: Sequelize.STRING(50),
//         isNull: true,
//         defaultValue: null,
//     },
//     resetToken: {
//         type: Sequelize.STRING(30),
//         isNull: true,
//         default: null,
//     },
//     resetTokenExpiration: {
//         type: Sequelize.DATE,
//         isNull: true,
//         default: null,
//     },
// });

// module.exports = User;
