const Bill = require("../../models/Bill");

const billController = {
  async create(req, res) {
    try {
      const bill = await new Bill();
      const now = new Date();
      bill.user = req.body.user;
      bill.price = req.body.price;
      bill.details = req.body.details;
      bill.payment_status = req.body.payment_status;
      bill.dateOrder = now;
      (bill.day = now.getDate()), (bill.month = now.getMonth() + 1);
      bill.year = now.getFullYear();
      await bill.save();
      res.status(200).json(bill);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
  async getBillByUser(req, res) {
    try {
      const idUser = req.params.idUser;
      if (idUser) {
        const bills = await Bill.find({ user: idUser }).populate("details");
        res.status(200).json(bills || []);
      } else {
        res.status(404).json("Missing id user on param");
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
module.exports = billController;
