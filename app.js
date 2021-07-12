const path = require('path');

const companyBodyObj = require('./routes/admin').companyBodyObj;
//const rootDir = require('./util/path');

const express = require('express');
const app = express();

//import routers
const adminRouter = require('./routes/admin').router;
const registerRouter = require('./routes/register-customer');
const homeRouter = require('./routes/home');

//body parser
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminRouter);
app.use(registerRouter);
app.use(homeRouter);

app.listen(3000);
