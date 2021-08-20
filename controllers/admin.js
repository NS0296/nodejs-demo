const User = require("../models/user.js");
const Product = require("../models/product.js");

exports.getAdmin = (req, res) => {
    res.render("admin/admin.ejs", {
        pageTitle: "Admin",
        isAuth: req.session.isAuth,
        path: "/admin",
    });
};

exports.getUsersTable = async (req, res) => {
    try {
        [[allUsers]] = await User.findAll();
        res.render("admin/users-table.ejs", {
            pageTitle: "Users Table",
            isAuth: req.session.isAuth,
            path: "/admin",
            allUsers: allUsers,
        });
    } catch (err) {
        console.log(err);
    }
};

exports.getProductsTable = async (req, res) => {
    try {
        [[allProducts]] = await Product.findAll();
        res.render("admin/products-table.ejs", {
            pageTitle: "Products Table",
            isAuth: req.session.isAuth,
            path: "/admin",
            allProducts: allProducts,
        });
    } catch (err) {
        console.log(err);
    }
};
