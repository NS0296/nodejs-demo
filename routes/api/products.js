const router = require("express").Router();

const productsApiController = require("../../controllers/api/products.js");

router.get("/findall", productsApiController.findAll);

router.post("/create", productsApiController.createItem);

router.delete("/delete/:itemId", productsApiController.deleteItem);

router.post("/update/:itemId", productsApiController.updateItem);

module.exports = router;
