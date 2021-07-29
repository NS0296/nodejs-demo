//responsibe for all admin routes
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.js");

router.get("/", adminController.getAdmin);

router.get("/users", adminController.getUsersTable);

router.post("/users/delete/:userId", adminController.postDeleteUser);

router.post("/users/edit/:userId", adminController.postEditUser);

router.post("/users/edit/confirm/:userId", adminController.postEditUserConfirm);

module.exports = router;
