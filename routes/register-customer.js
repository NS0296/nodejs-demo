const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');

const path = require('path');

router.get('/register', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'register.html'));
});

router.post('register', (req, res, next) => {
    console.log(req.body);
    res.redirect('/register');
});

module.exports = router;
