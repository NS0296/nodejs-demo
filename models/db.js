//this file is responsible for the connection to the database
//and inserting values into each table
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '***REMOVED***',
//     database: 'node-demo',
//     connectionLimit: 10,
// });

// const poolPromise = pool.promise(); //wrap pool in promise, so cb aren't needed anymore

// //register user
// const registerUser = (valuesArr) => {
//     pool.execute(
//         'INSERT INTO customers(username, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
//         [
//             valuesArr[0],
//             valuesArr[1],
//             valuesArr[2],
//             parseInt(valuesArr[3]) || null,
//             valuesArr[4] || null,
//         ]
//     );
// };

// const fetchUsers = () => {
//     return poolPromise.execute('SELECT * FROM customers');
// };

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('user', userSchema);
