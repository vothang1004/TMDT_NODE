const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    storage: {
      type: Boolean,
      default: false,
      require: true,
    },
    vip: {
      type: Boolean,
      default: false,
      require: true,
    },
    download: {
      type: Boolean,
      default: false,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
