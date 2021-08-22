const router = require("express").Router();

const orderApiController = require("../../controllers/api/orders");

router.post("/create/:userId", orderApiController.postCreateOrder);

module.exports = router;
