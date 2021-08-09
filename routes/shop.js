const router = require("express").Router();

const shopController = require("../controllers/shop.js");

router.get("/", shopController.getAllShop);

module.exports = router;
