const Sequelize = require("sequelize"); //sequelize is used for session-store
const mysql = require("mysql2");

const sequelize = new Sequelize(
    process.env.MYSQLDEFAULTDATABASE,
    process.env.MYSQLUSER,
    process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        dialect: "mysql",
        logging: false,
    }
);

const pool = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDEFAULTDATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

exports.promisePool = pool.promise();
exports.sequelize = sequelize;
