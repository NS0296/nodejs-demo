const router = require("express").Router();

const productsApiController = require("../../controllers/api/products.js");

router.get("/findall", productsApiController.findAll);

router.post("/create", productsApiController.create);

router.put("/update/:productId", productsApiController.update);

router.delete("/destroy/:productId", productsApiController.destroy);

module.exports = router;
