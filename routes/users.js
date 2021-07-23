const path = require('path');

const express = require('express');
const bcrypt = require('bcryptjs');

const rootDir = require('../util/path');

const userModel = require(path.join(rootDir, 'models', 'db.js'));

const router = express.Router();

//register
router.get('/register', (req, res, next) => {
    res.render('user-register.ejs');
});

router.post('/register', async (req, res, next) => {
    const { username, email, password, phone, address } = req.body;
    res.redirect('/');

    const hashPassword = await bcrypt.hash(password, 4);

    //create new userModel
    const newUser = new userModel({
        username: username,
        email: email,
        password: hashPassword,
        phone: parseInt(phone) || null,
        address: address || null,
    });

    try {
        const isUserExist = await userModel.exists({ email: email });
        if (isUserExist) {
            throw new Error('Email already exists for another user');
        }

        await newUser.save(); //insert the model inctance(aka document) into the db
    } catch (err) {
        console.log(err);
    }
});

//login
router.get('/login', (req, res, next) => {
    res.render('user-login.ejs');
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user === null) {
            throw new Error('User does not exist');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error('Wrong Password');
        }
        req.session.isAuth = true;
    } catch (err) {
        console.log(err);
    }

    res.redirect('/');
});

router.get(
    '/dashboard',
    /*isAuth func, */ (req, res, next) => {
        res.render('dashboard.ejs');
    }
);

module.exports = router;
