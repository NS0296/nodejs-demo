const router = require("express").Router();

const apiController = require("../../controllers/api/items.js");

router.get("/all", apiController.allItems);

router.post("/create", apiController.createItem);

router.delete("/delete/:itemId", apiController.deleteItem);

router.post("/update/:itemId", apiController.updateItem);

module.exports = router;
