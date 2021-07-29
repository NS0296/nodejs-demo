const path = require("path");

const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.js");

router.get("/register", usersController.getRegister);

router.post("/register", usersController.postRegister);

router.get("/login", usersController.getLogin);

router.post("/login", usersController.postLogin);

router.get("/logout", usersController.getLogout);

module.exports = router;
