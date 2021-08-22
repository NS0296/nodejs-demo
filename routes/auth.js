const router = require("express").Router();

const authController = require("../controllers/auth.js");
const middleware = require("../middleware/is-auth");

router.get("/register", middleware.isNotAuth, authController.getRegister);

router.post("/register", middleware.isNotAuth, authController.postRegister);

router.get("/login", middleware.isNotAuth, authController.getLogin);

router.post("/login", middleware.isNotAuth, authController.postLogin);

// router.get("/reset", middleware.isNotAuth, authController.getReset);

// router.post("/reset", middleware.isNotAuth, authController.postReset);

// router.get("/reset/:resetToken", middleware.isNotAuth, authController.getNewPassword);

// router.post("/reset/confirm", middleware.isNotAuth, authController.postNewPassword);

router.get("/logout", middleware.isAuth, authController.getLogout); //NB:authentication means beign logged in

router.get("/dashboard", middleware.isAuth, authController.getUserDashboard);

module.exports = router;
