//responsibe for all admin routes
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin.js");

router.get("/", adminController.getUsersTable);

router.post("/delete/:userId", adminController.postDeleteUser);

router.post("/edit/:userId", adminController.postEditUser);

router.post("/edit/confirm/:userId", adminController.postEditUserConfirm);

module.exports = router;
