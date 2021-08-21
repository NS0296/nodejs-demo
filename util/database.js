const Sequelize = require("sequelize"); //sequelize is used for session-store
const mysql = require("mysql2");

const sequelize = new Sequelize(
    process.env.MYSQLDEFAULTDATABASE,
    "root",
    process.env.MYSQLPASSWORD,
    {
        host: "localhost",
        dialect: "mysql",
        logging: false,
    }
);

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDEFAULTDATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

exports.promisePool = pool.promise();
exports.sequelize = sequelize;
