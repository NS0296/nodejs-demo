const router = require("express").Router();

const lookupApiController = require("../../controllers/api/lookup");

router.get("/lookup/payment-methods", lookupApiController.findPaymentMethods);

module.exporst = router;
