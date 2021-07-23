const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    if ('isAuth' in req.session) {
        res.render('home.ejs', { isAuth: req.session.isAuth });
    } else {
        res.render('home.ejs', { isAuth: false });
    }
});

module.exports = router;
