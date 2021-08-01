const router = require("express").Router();

const usersController = require("../controllers/auth.js");
const middleware = require("../middleware/is-auth");

router.get("/register", middleware.isNotAuth, usersController.getRegister);

router.post("/register", middleware.isNotAuth, usersController.postRegister);

router.get("/login", middleware.isNotAuth, usersController.getLogin);

router.post("/login", middleware.isNotAuth, usersController.postLogin);

router.get("/logout", middleware.isAuth, usersController.getLogout); //NB:authentication means beign logged in

router.get("/dashboard", middleware.isAuth, usersController.getUserDashboard);

module.exports = router;
