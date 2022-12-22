const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    details: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Product",
    },
    payment_status: {
      type: Boolean,
      default: false,
    },
    bill_status: {
      type: Boolean,
      default: 1, // 1 đặt hàng, 2 đang giao, 3 đã giao, 4 đã hủy
    },
    dateOrder: {
      type: Date,
    },
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
