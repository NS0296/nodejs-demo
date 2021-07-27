//responsibe for all admin routes
const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const User = require(path.join(rootDir, "models", "users.js"));

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("admin.ejs");
});

//render list of users fetched from MongoDB collection
router.get("/users", async (req, res, next) => {
    let rows = [];
    try {
        const docsList = await User.findAll({
            //returns list rows in javascript objects
            attributes: ["username", "email", "phone", "address"],
        });
        for (let i = 0; i < docsList.length; i++) {
            //get list of rows from query result
            let currentDoc = docsList[i];
            let row = [];
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

module.exports = router;
