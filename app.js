//tune the css
const path = require('path');

const express = require('express');
const { appendFileSync } = require('fs');

const rootDir = require(path.join(__dirname, 'util', 'path'));

//import routers
const adminRouter = require(path.join(rootDir, 'routes', 'admin.js'));
const usersRouter = require(path.join(rootDir, 'routes', 'users.js'));
const companiesRouter = require(path.join(rootDir, 'routes', 'companies.js'));
const homeRouter = require(path.join(rootDir, 'routes', 'home.js'));

const app = express();

//config express
app.set('views', 'views');
app.set('template engine', 'ejs');

//serve public folder
app.use(express.static(path.join(__dirname, 'public')));

//the middleware
//  body parser
app.use(express.urlencoded({ extended: false }));

//  routers
app.use('/admin', adminRouter);
app.use('/user', usersRouter);
app.use('/company', companiesRouter);
app.use(homeRouter);

//catch all
app.use('/', (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
