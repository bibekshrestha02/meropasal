const express = require("express");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./../client/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });
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
  uploadPhoto,
} = require("./../Controller/ProductController");

const { varification, checkRole } = require("./../Controller/AuthController");
const Router = express.Router();
Router.route("/").get(Home);
Router.route("/search/:search").get(searchItems);
Router.route("/mobiles").get(getAllMobiles);
Router.route("/laptops").get(getAllLaptops);
Router.route("/monitors").get(getAllMonitors);
Router.route("/Products").post(varification, checkRole("admin"), addProducts);
Router.route("/Products/:id")
  .get(Categories)
  .delete(varification, checkRole("admin"), deleteProduct)
  .patch(varification, checkRole("admin"), updateProducts);
Router.route("/Product/upload").post(
  varification,
  checkRole("admin"),
  upload.any(),
  uploadPhoto
);
module.exports = Router;
