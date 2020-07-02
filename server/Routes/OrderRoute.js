const express = require("express");
const { varification, checkRole } = require("./../Controller/AuthController");
const { carts, deleteCarts } = require("./../Controller/CartsController");
const {
  createOrder,
  getOrder,
  deleteOrder,
} = require("./../Controller/OrderController");
const Router = express.Router();

Router.route("/")
  .post(varification, carts, createOrder, deleteCarts)
  .get(varification, checkRole("admin"), getOrder);
Router.route("/:id").delete(varification, checkRole("admin"), deleteOrder);
module.exports = Router;
