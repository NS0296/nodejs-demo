const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const db = require(path.join(rootDir, 'models', 'db.js'));

const router = express.Router();

router.get('/register', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'company-register.html'));
});

router.post('/register', (req, res, next) => {
    db.registerCompany(Object.values(req.body));
    res.redirect('/');
});

module.exports = router;
