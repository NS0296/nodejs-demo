//this file reads data from lookup tables

const pool = require("../util/database").promisePool;

const Lookup = {
    findPaymentMethods: () => {
        return pool.execute("SELECT title FROM payment_method");
    },
};

module.exports = Lookup;
