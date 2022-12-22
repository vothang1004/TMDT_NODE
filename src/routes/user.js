const userController = require("../app/controllers/user.controller");
const middleWareController = require("../app/middlewares/middleWareController");

const router = require("express").Router();

router.get("/list", userController.getAllUser);
router.put("/:id", middleWareController.verifyToken, userController.updateUser);

module.exports = router;
