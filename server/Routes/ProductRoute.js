const express = require("express");
const {
  getAllMonitors,
  getAllLaptops,
  getAllMobiles,
  addProducts,
  updateProducts,
  deleteProduct,
  Categories,
  Home,
  searchItems,
} = require("./../Controller/ProductController");

const { varification, checkRole } = require("./../Controller/AuthController");
const Router = express.Router();
Router.route("/").get(Home);
Router.route("/search/:search").get(searchItems);
Router.route("/mobiles").get(getAllMobiles);
Router.route("/laptops").get(getAllLaptops);
Router.route("/monitors").get(getAllMonitors);
Router.route("/Products").post(varification, checkRole("admin"), addProducts);
// Router.route("/Products/:Categories/:Title").patch(
//   varification,
//   checkRole("admin"),
//   updateProducts
// );
Router.route("/Products/:id")
  .delete(varification, checkRole("admin"), deleteProduct)
  .patch(varification, checkRole("admin"), updateProducts);
Router.route("/categories/:id").get(Categories);

module.exports = Router;
