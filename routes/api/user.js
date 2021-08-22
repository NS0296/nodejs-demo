const router = require("express").Router();

const usersApiController = require("../../controllers/api/user");

router.get("/findAll", usersApiController.findAll);

router.post("/save", usersApiController.save);

router.put("/update/:userId", usersApiController.update);

router.delete("/destroy/:userId", usersApiController.destroy);

module.exports = router;
