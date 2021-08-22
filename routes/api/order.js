const router = require("express").Router();

const orderApiController = require("../../controllers/api/order");

router.post("/create/:userId", orderApiController.postCreateOrder);

module.exports = router;
