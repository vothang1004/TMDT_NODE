const billController = require("../app/controllers/billController");
const middleWareController = require('../app/middlewares/middleWareController')

const router = require("express").Router();

router.get('/:idUser', middleWareController.verifyToken, billController.getBillByUser);
router.post('/', middleWareController.verifyToken, billController.create)

module.exports = router;
