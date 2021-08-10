const router = require("express").Router();

const apiController = require("../../controllers/api/carts");

router.get("/create/:userId", apiController.createCart);

router.get("/allItems/:userId", apiController.getCart);

router.get("/add/:userId/:itemId", apiController.postCartItem);

router.get("/add/:userId/:itemId", apiController.deleteCartItem);

router.get("/summary/:userId", apiController.getCartSummary);

module.exports = router;
