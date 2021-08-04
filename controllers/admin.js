const User = require("../models/user.js");

exports.getPage = (req, res) => {
    res.render("admin/admin-users.ejs", {
        pageTitle: "Edit User",
        isAuth: req.session.isAuth,
        path: "",
    });
};
exports.getUsersTable = async (req, res, next) => {
    try {
        const docsList = await User.findAll({
            attributes: ["id", "username", "email", "phone", "address"],
        });
        res.send(docsList);
    } catch (err) {
        res.send(err);
    }
};

exports.postDeleteUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    const deleteRow = await User.destroy({ where: { id: userId } });
    res.redirect("/admin");
};

exports.postEditUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId); //sourced from users table view dynamic route
    const { username, email, phone, address } = await User.findByPk(userId);
    res.render("admin/update-row.ejs", {
        userId: userId,
        username: username,
        email: email,
        phone: phone,
        address: address,
        pageTitle: "Edit User",
        isAuth: req.session.isAuth,
        path: "",
    });
};

exports.postEditUserConfirm = async (req, res, next) => {
    const userId = parseInt(req.params.userId); //sourced from edit form (above)
    const { username, email, phone, address } = req.body;
    const updateRow = await User.update(
        {
            username: username,
            email: email,
            phone: phone,
            address: address,
        },
        {
            where: { id: userId },
        }
    );
    res.redirect("/admin");
};
