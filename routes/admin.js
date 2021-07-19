//responsibe for all admin routes
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const db = require(path.join(rootDir, 'models', 'db.js'));

const router = express.Router();

router.get('/admin', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'admin.html'));
});

//render list of users fetched from database
router.get('/admin/users', (req, res, next) => {
    db.fetchUsers()
        .then(([rows, fields]) => {
            res.render('admin-users.ejs', { rows: rows });
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

//render list of companies fetched from database
router.get('/admin/companies', (req, res, next) => {
    db.fetchCompanies()
        .then(([rows, fields]) => {
            res.render('admin-companies.ejs', { rows: rows });
        })
        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

module.exports = router;
