//responsibe for all admin routes
const router = require("express").Router();

const adminController = require("../controllers/admin.js");

router.get("/", adminController.getPage);

router.get("/users", adminController.usersTable);

router.delete("/delete/:userId", adminController.deleteUser);

router.post("/update/:userId", adminController.updateUser);

module.exports = router;
