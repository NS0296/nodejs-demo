const router = require("express").Router();

const apiController = require("../../controllers/api/users.js");

router.get("/all", apiController.allUsers);

router.post("/insert", apiController.insert);

router.put("/update/:userId", apiController.updateUser);

router.delete("/delete/:userId", apiController.deleteUser);

module.exports = router;
