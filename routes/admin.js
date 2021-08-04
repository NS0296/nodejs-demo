//responsibe for all admin routes
const router = require("express").Router();

const adminController = require("../controllers/admin.js");

router.get("/", adminController.getPage);

router.get("/get", adminController.getUsersTable);

router.delete("/delete/:userId", adminController.deleteUser);

router.post("/edit/:userId", adminController.postEditUser);

router.post("/edit/confirm/:userId", adminController.postEditUserConfirm);

module.exports = router;
