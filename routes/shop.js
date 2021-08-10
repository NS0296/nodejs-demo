const router = require("express").Router();

const shopController = require("../controllers/shop.js");

router.get("/", shopController.getIndex);

module.exports = router;
