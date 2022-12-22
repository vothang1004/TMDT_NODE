const Product = require("../../models/Product");

const productController = {
  async createProduct(req, res) {
    try {
      const product = await new Product();
      product.name = req.body.name;
      product.description = req.body.description;
      product.price = req.body.price;
      product.storage = req.body.storage || false;
      product.vip = req.body.vip || false;
      product.download = req.body.download || false;
      product.save();
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
  async getAll(req, res) {
    try {
      const products = await Product.find();
      if (products) {
        res.status(200).json(products);
      } else {
        res.status(204).json([]);
      }
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};

module.exports = productController;
