const path = require('path');

//const rootDir = require('./util/path');

const express = require('express');
const app = express();

//import routers
const adminRouter = require('./routes/admin');

//body parser
app.use(express.urlencoded({ extended: false }));

app.use('/admin', adminRouter);

app.listen(3000);
