const router = require("express").Router();

const shopController = require("../controllers/shop.js");

router.get("/", shopController.getIndex);

router.get("/cart", shopController.getCart);

router.get("/cart/checkout", shopController.getCheckout);

module.exports = router;
