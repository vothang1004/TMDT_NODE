const Bill = require("../../models/Bill");

const doanhThuController = {
  async getDoanhThuByPeriod(req, res) {
    try {
      const startDate = req.params.start_date;
      const endDate = req.params.end_date;
      const doanhThus = await Bill.find({
        dateOrder: { $gte: startDate, $lte: endDate },
      });
      if (doanhThus) {
        res.status(200).json(doanhThus);
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
  // get doanh thu / thang theo hang hoa
  async getDoanhThuTheoThangByHangHoa(req, res) {
    try {
      const idProduct = req.query.idProduct;
      const thang = req.query.thang;
      const bills = await Bill.find({
        month: thang,
        details: { $in: [idProduct] },
      });
      res.status(200).json(bills);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
module.exports = doanhThuController;
