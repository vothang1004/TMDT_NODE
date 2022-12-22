const authController = require("../app/controllers/auth.controller");

const router = require("express").Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/resetPassword", authController.resetPassword);

module.exports = router;
