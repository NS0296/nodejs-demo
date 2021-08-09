//responsibe for all admin routes
const router = require("express").Router();

const adminController = require("../controllers/admin.js");

router.get("/", adminController.getAdmin);

router.get("/userstable", adminController.getUsersTable);

router.get("/itemstable", adminController.getItemsTable);

module.exports = router;
