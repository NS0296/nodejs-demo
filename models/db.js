//this file is responsible for the connection to the database
//and inserting values into each table
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '***REMOVED***',
    database: 'node-demo',
    connectionLimit: 10,
});

const poolPromise = pool.promise(); //wrap pool in promise, so cb aren't needed anymore

//make sure node-demo database is active
//pool.execute('USE node-demo');

//register user
const registerUser = (valuesArr) => {
    pool.execute(
        'INSERT INTO customers(username, email, password, phone, address) VALUES (?, ?, ?, ?, ?)',
        [
            valuesArr[0],
            valuesArr[1],
            valuesArr[2],
            parseInt(valuesArr[3]),
            valuesArr[4],
        ]
    );
};

//task: adapt INSERT statements to poolPromise
const registerCompany = (valuesArr) => {
    pool.execute(
        'INSERT INTO companies(name, phone, address) VALUES (?, ?, ?)',
        [valuesArr[0], parseInt(valuesArr[1]), valuesArr[2]]
    );
};

const fetchUsers = () => {
    return poolPromise.execute('SELECT * FROM customers');
};

const fetchCompanies = () => {
    return poolPromise.execute('SELECT * FROM companies');
};

module.exports = {
    registerUser: registerUser,
    registerCompany: registerCompany,
    fetchUsers: fetchUsers,
    fetchCompanies: fetchCompanies,
};
