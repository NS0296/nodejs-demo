const User = require("../../models/user.js");
const pool = require("../../util/database").promisePool;

exports.allUsers = (req, res, next) => {
    const users = User.getAllUsers()
        .then(([rows, fields]) => {
            res.send(rows);
        })
        .catch(err => res.send(err));
};

exports.deleteUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    try {
        // const deleteRow = await User.destroy({ where: { id: userId } });
        res.send({ status: "done" });
    } catch (err) {
        res.send(err);
    }
};

exports.updateUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const { username, email, phone, address } = req.body;
    try {
        // const updateUser = await User.update(
        //     {
        //         username: username,
        //         email: email,
        //         phone: phone,
        //         address: address,
        //     },
        //     {
        //         where: { id: userId },
        //     }
        // );
        if (updateUser[0] === 0) {
            throw new Error("User does not exit");
        }
        res.send({ status: "done" });
    } catch (err) {
        res.send(err);
    }
};
