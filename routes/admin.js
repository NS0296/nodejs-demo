//responsibe for all admin routes
const router = require("express").Router();

const adminController = require("../controllers/admin.js");

router.get("/", adminController.getPage);

router.get("/users", adminController.usersTable);

router.delete("/delete/:userId", adminController.deleteUser);

router.post("/edit/:userId", adminController.editUser);

router.post("/edit/confirm/:userId", adminController.editUserConfirm);

module.exports = router;
