//responsibe for all admin routes
const router = require("express").Router();

const adminController = require("../controllers/admin.js");

router.get("/admin", adminController.getAdmin);

router.get("/api/users", adminController.usersTable);

router.delete("/api/delete/:userId", adminController.deleteUser);

router.post("/api/update/:userId", adminController.updateUser);

module.exports = router;
