const User = require("../models/user.js");
const Item = require("../models/item.js");

exports.getAdmin = (req, res) => {
    res.render("admin/admin.ejs", {
        pageTitle: "Admin",
        isAuth: req.session.isAuth,
        path: "/admin",
    });
};

exports.getUsersTable = (req, res) => {
    res.render("admin/users-table.ejs", {
        pageTitle: "Users Table",
        isAuth: req.session.isAuth,
        path: "/admin",
    });
};

exports.getItemsTable = (req, res) => {
    res.render("admin/items-table.ejs", {
        pageTitle: "Items Table",
        isAuth: req.session.isAuth,
        path: "/admin",
    });
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
