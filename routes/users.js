const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const db = require(path.join(rootDir, 'models', 'db.js'));

const router = express.Router();

//register
router.get('/register', (req, res, next) => {
    res.render('user-register.ejs');
});

router.post('/register', (req, res, next) => {
    db.registerUser(Object.values(req.body));
    res.redirect('/');
});

//login
router.get('/login', (req, res, next) => {
    res.render('user-login.ejs');
});

router.post('/login', (req, res, next) => {
    res.redirect('/');
});

module.exports = router;
