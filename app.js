//tune the css
const path = require('path');

const express = require('express');

//import routers
const adminRouter = require(path.join(__dirname, 'routes', 'admin.js'));
const usersRouter = require(path.join(__dirname, 'routes', 'users.js'));

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
    res.render('home.ejs');
});

//  external routers
app.use('/admin', adminRouter);
app.use(usersRouter);

//  catch all
app.use('/', (req, res, next) => {
    res.status(404).render('404.ejs');
});

app.listen(3000);
