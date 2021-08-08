const User = require("../models/user.js");

exports.getAdmin = (req, res) => {
    res.render("admin/admin.ejs", {
        pageTitle: "Admin",
        isAuth: req.session.isAuth,
        path: "/admin",
    });
};
