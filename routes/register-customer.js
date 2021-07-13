const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');

const path = require('path');

const db = require(path.join(rootDir, 'util', 'database.js'));

router.get('/register', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'register.html'));
});

router.post('/register', (req, res, next) => {
    db.execute('INSERT INTO customers VALUES (default, ?, ?, ?)', [
        req.body.name,
        req.body.phone,
        req.body.address,
    ]);
    res.redirect('/register');
});

module.exports = router;
