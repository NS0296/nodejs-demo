const express = require('express');

const rootDir = require('../util/path');

const path = require('path');

const router = express.Router();

//404 error
router.use('/', (req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

module.exports = router;
