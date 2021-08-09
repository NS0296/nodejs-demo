//responsibe for all admin routes
const router = require("express").Router();

const adminController = require("../controllers/admin.js");

router.get("/admin", adminController.getAdmin);

router.get("/admin/userstable", adminController.getUsersTable);

module.exports = router;
