const fetch = require("node-fetch");
const User = require("../models/user.js");
const Item = require("../models/product.js");

exports.getAdmin = (req, res) => {
    res.render("admin/admin.ejs", {
        pageTitle: "Admin",
        isAuth: req.session.isAuth,
        path: "/admin",
    });
};

exports.getUsersTable = async (req, res) => {
    try {
        const fetchRes = await fetch("http://localhost:3000/api/users/findall");
        let allUsers = await fetchRes.json();
        allUsers = allUsers[0];
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
        const fetchRes = await fetch("http://localhost:3000/api/products/findall");
        let allProducts = await fetchRes.json();
        allProducts = allProducts[0];
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

// exports.postCreateItem = async (req, res, next) => {
//     const dummyItem = {
//         name: "Monitor",
//         categoryName: "Electronics",
//         manufacture: "MSI",
//         price: 50,
//         stockAvailable: 10,
//         dateFirstAvailable: Date.now(),
//     };
//     //creates new Item model instance and stores it in database
//     try {
//         const createItem = await Item.create({
//             name: dummyItem.name,
//             categoryName: dummyItem.categoryName,
//             manufacture: dummyItem.manufacture,
//             price: dummyItem.price,
//             stockAvailable: dummyItem.stockAvailable,
//             dateFirstAvailable: dummyItem.dateFirstAvailable,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };
