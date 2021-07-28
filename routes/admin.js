//responsibe for all admin routes
const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const { type } = require("os");
const User = require(path.join(rootDir, "models", "users.js"));

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("admin.ejs");
});

//render list of users fetched from MongoDB collection
router.get("/users", async (req, res, next) => {
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
        res.render("admin-users.ejs", { rows: rows });
    } catch (err) {
        console.log(err);
    }
});

router.post("/users/delete/:userId", async (req, res, next) => {
    const userId = parseInt(req.params.userId);
    console.log(typeof userId, userId);
    const deleteRow = await User.destroy({ where: { id: userId } });
    res.redirect("/admin/users");
});

router.post("/users/edit/:userId", async (req, res, next) => {
    const userId = parseInt(req.params.userId); //sourced from users table view dynamic route
    const { username, email, phone, address } = await User.findByPk(userId);
    res.render("update-row.ejs", {
        userId: userId,
        username: username,
        email: email,
        phone: phone,
        address: address,
    });
});

router.post("/users/edit/confirm/:userId", async (req, res, next) => {
    const userId = parseInt(req.params.userId); //sourced from edit form
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
    res.redirect("/admin/users");
});

module.exports = router;
