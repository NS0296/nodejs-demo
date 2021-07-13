const path = require('path');

const express = require('express');
const app = express();

//import routers
const adminRouter = require('./routes/admin').router;
const registerRouter = require('./routes/register-customer');
const homeRouter = require('./routes/home');
const status404 = require('./routes/404');

//body parser
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminRouter);
app.use(registerRouter);
app.use(homeRouter);
app.use(status404);

app.listen(3000);
