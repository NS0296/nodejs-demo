//tune the css
const path = require('path');

const express = require('express');
const { appendFileSync } = require('fs');

const rootDir = require(path.join(__dirname, 'util', 'path'));

//import routers
const adminRouter = require(path.join(rootDir, 'routes', 'admin.js'));
const UsersRouter = require(path.join(rootDir, 'routes', 'users.js'));
const companiesRouter = require(path.join(rootDir, 'routes', 'companies.js'));
const homeRouter = require(path.join(rootDir, 'routes', 'home.js'));
const status404 = require(path.join(rootDir, 'routes', '404.js'));

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
app.use(adminRouter);
app.use(UsersRouter);
app.use(companiesRouter);
app.use(homeRouter);
app.use(status404);

app.listen(3000);
