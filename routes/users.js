const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const db = require(path.join(rootDir, 'models', 'db.js'));

const router = express.Router();

//register
router.get('/user/register', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'user-register.html'));
});

router.post('/user/register', (req, res, next) => {
    db.registerUser(Object.values(req.body));
    res.redirect('/');
});

//sign-in
router.get('/user/sign-in', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'user-sign-in.html'));
});

module.exports = router;
