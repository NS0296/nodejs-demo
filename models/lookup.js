//this file reads data from lookup tables

const pool = require("../util/database").promisePool;

const lookup = {
    findPaymentMethods: () => {
        return pool.execute("SELECT 'title' FROM payment_method");
    },
};

module.exports = lookup;
