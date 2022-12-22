const authRoute = require("../routes/auth");
const userRoute = require("../routes/user");
const productRoute = require("../routes/product");
const billRoute = require("../routes/bill");
const doanhThuRoute = require("../routes/doanhthu");

const initWebRoute = (app) => {
  app.use("/v1/auth", authRoute);
  app.use("/v1/user", userRoute);
  app.use("/v1/products", productRoute);
  app.use("/v1/bills", billRoute);
  app.use("/v1/doanhthu", doanhThuRoute);
};
module.exports = initWebRoute;
