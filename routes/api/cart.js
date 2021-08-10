const router = require("express").Router();

const apiController = require("../../controllers/api/carts");

router.get("/create/:userId", apiController.createCart);

module.exports = router;
