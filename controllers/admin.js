const User = require("../models/user.js");

exports.getUsersTable = async (req, res, next) => {
    let rows = [];
    try {
        const docsList = await User.findAll();
        //returns list rows in javascript objects
        for (let i = 0; i < docsList.length; i++) {
            let currentDoc = docsList[i];
            let row = [];
            row.push(currentDoc.id);
            row.push(currentDoc.username);
            row.push(currentDoc.email);
            row.push(currentDoc.phone || "null");
            row.push(currentDoc.address || "null");
            rows.push(row);
        }
        res.render("admin-users.ejs", {
            rows: rows,
            pageTitle: "Users Table",
            isAuth: req.session.isAuth,
            path: "/admin",
        });
    } catch (err) {
        console.log(err);
    }
};

exports.postDeleteUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    console.log(typeof userId, userId);
    const deleteRow = await User.destroy({ where: { id: userId } });
    res.redirect("/admin");
};

exports.postEditUser = async (req, res, next) => {
    const userId = parseInt(req.params.userId); //sourced from users table view dynamic route
    const { username, email, phone, address } = await User.findByPk(userId);
    res.render("update-row.ejs", {
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
