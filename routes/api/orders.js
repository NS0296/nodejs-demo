const router = require("express").Router();

const apiController = require("../../controllers/api/orders");

router.get("/create/:userId", apiController.postOrder);

module.exports = router;
