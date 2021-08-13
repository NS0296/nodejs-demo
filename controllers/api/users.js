const User = require("../../models/user.js");
const pool = require("../../util/database").promisePool;

exports.allUsers = (req, res, next) => {
    const users = User.getAll()
        .then(([rows, fields]) => {
            res.send(rows);
        })
        .catch(err => res.send(err));
};

exports.deleteUser = (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const deleteUser = User.deleteByPK(userId)
        .then(response => res.send(response))
        .catch(err => res.send(err));
};

exports.insert = (req, res) => {
    const { username, email, password, phone, home_address } = req.body;
    const user = new User(username, email, password, phone, home_address);
    const insertUser = user
        .insert()
        .then(response => res.send(response))
        .catch(err => res.send(err));
};

exports.updateUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const updateUser = User.updateByPK(userId, req.body)
        .then(response => res.send(response))
        .catch(err => res.send(err));
};
