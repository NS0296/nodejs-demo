//tune the css
const path = require('path');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//import routers
const adminRouter = require(path.join(__dirname, 'routes', 'admin.js'));
const usersRouter = require(path.join(__dirname, 'routes', 'users.js'));

//config express
app.set('views', 'views');
app.set('template engine', 'ejs');

const mongoUri =
    'mongodb+srv://main-server:8ryPNpKs1keznyid@nodejs-demo.v9yvf.mongodb.net/authentication?retryWrites=true&w=majority';

mongoose
    .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, console.log('Server is listening'));
    })
    .catch((err) => {
        console.log(err);
    });

const store = new MongoDBStore(
    {
        uri: mongoUri,
        collection: 'sessions',
    },
    (err) => {
        if (err) {
            console.log(err);
        }
    }
);

app.use(
    session({
        secret: 'shhhh',
        resave: false,
        saveUninitialized: false,
        store: store, //this prop defaults to new MemoryStore instance
    })
);

//the middleware
app.use(express.static(path.join(__dirname, 'public'))); //serve public
app.use(express.urlencoded({ extended: false })); //body parser

//  home page
app.get('/', (req, res, next) => {
    res.render('home.ejs');
});

//  external routers
app.use('/admin', adminRouter);
app.use(usersRouter);

//  catch all
app.use('/', (req, res, next) => {
    res.status(404).render('404.ejs');
});

module.exports = store;
