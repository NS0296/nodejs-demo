const router = require("express").Router();

router.get("/all", adminController.allUsers);

router.delete("/delete/:userId", adminController.deleteUser);

router.post("/update/:userId", adminController.updateUser);

module.exports = router;
