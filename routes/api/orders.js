const router = require("express").Router();

const apiController = require("../../controllers/api/orders");

router.get("/create/:userId", apiController.postOrder); //change this to post

module.exports = router;
