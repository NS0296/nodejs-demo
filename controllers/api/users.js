const User = require("../../models/user.js");
const pool = require("../../util/database").promisePool;

exports.findAll = (req, res, next) => {
    const users = User.findAll()
        .then(([rows, fields]) => {
            res.send(rows);
        })
        .catch(err => res.send(err));
};

exports.destroy = (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const deleteUser = User.deleteByPK(userId)
        .then(response => res.send(response))
        .catch(err => res.send(err));
};

exports.save = (req, res) => {
    const { username, email, password, phone, home_address } = req.body;
    const user = new User(username, email, password, phone, home_address);
    const saveUser = user
        .save()
        .then(response => res.send(response))
        .catch(err => res.send(err));
};

exports.update = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const updateUser = User.updateByPK(userId, req.body)
        .then(response => res.send(response))
        .catch(err => res.send(err));
};
