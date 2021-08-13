const router = require("express").Router();

const apiController = require("../../controllers/api/users.js");

router.get("/all", apiController.allUsers);

router.delete("/delete/:userId", apiController.deleteUser);

router.post("/update/:userId", apiController.updateUser);

router.post("/insert", apiController.insert);

module.exports = router;
