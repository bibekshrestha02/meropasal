const express = require("express");

const { varification, checkRole } = require("./../Controller/AuthController");
const {
  createCarts,
  getCarts,
  deleteCarts,
  deleteSingleCarts,
  updateCartsItems,
} = require("./../Controller/CartsController");
const Router = express.Router();
// inserting carts, getting & deleting carts
Router.route("/carts")
  .post(varification, createCarts)
  .get(varification, getCarts)
  .delete(varification, deleteCarts);

//   deleting single items from carts
// TODO: Delting single items is not working
Router.route("/carts/:title")
  .delete(varification, deleteSingleCarts, getCarts)
  .patch(varification, updateCartsItems, getCarts);
module.exports = Router;
