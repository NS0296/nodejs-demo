//tune the css
const path = require('path');

const express = require('express');

//const __dirname = require(path.join(__dirname, 'util', 'path'));

//import routers
const adminRouter = require(path.join(__dirname, 'routes', 'admin.js'));
const usersRouter = require(path.join(__dirname, 'routes', 'users.js'));
const companiesRouter = require(path.join(__dirname, 'routes', 'companies.js'));

const app = express();

//config express
app.set('views', 'views');
app.set('template engine', 'ejs');

//the middleware
//  serve public folder
app.use(express.static(path.join(__dirname, 'public')));

//  body parser
app.use(express.urlencoded({ extended: false }));

//  home page
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

//  external routers
app.use('/admin', adminRouter);
app.use('/user', usersRouter);
app.use('/company', companiesRouter);

//  catch all
app.use('/', (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
