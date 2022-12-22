const router = require("express").Router();
const middleWareController = require("../app/middlewares/middleWareController");
const doanhThuController = require("../app/controllers/doanhThuController");

router.get(
  "/:start_date/:end_date",
  middleWareController.verifyTokenAndAdminAuth,
  doanhThuController.getDoanhThuByPeriod
);
router.get('', middleWareController.verifyTokenAndAdminAuth,doanhThuController.getDoanhThuTheoThangByHangHoa)

module.exports = router;
