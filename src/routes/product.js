const router = require("express").Router();
const productController = require("../app/controllers/productController");

router.get("/", productController.getAll);
router.post("/", productController.createProduct);

module.exports = router;
