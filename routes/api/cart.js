const router = require("express").Router();

const cartApiController = require("../../controllers/api/carts");

router.get("/create/:userId", cartApiController.createCart);

router.get("/:userId/findallitems", cartApiController.getCartItems);

router.get("/add/:productId", cartApiController.postCartItem);

router.delete("/delete/:userId/:itemId", cartApiController.deleteCartItem);

router.get("/summary/:userId", cartApiController.getCartSummary);

module.exports = router;
