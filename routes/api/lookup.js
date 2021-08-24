const router = require("express").Router();

const lookupApiController = require("../../controllers/api/lookup");

router.get("/payment-methods", lookupApiController.findPaymentMethods);

module.exports = router;
