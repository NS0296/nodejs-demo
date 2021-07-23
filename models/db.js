//this file is responsible for the connection to the database
//and inserting values into each table

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
