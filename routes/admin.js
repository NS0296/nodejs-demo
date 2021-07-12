//this file is responsible for admin pagess
const path = require('path');

const rootDir = require('../util/path');

const express = require('express');

const router = express.Router();

let companyBodyObj = {};

router.get('/add-companies', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-companies.html'));
});

router.post('/add-companies', (req, res, next) => {
    companyBodyObj = req.body;
    res.redirect('/admin/add-companies');
});

module.exports.router = router;
module.exports.companyBodyObj = companyBodyObj;
