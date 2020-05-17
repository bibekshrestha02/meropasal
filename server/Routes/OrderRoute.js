const express = require("express");

const router = express.Router();
const {
  getUserById,
  PushOrderInPurchedList,
  payment,
} = require("./../Controller/userController");
const { varification } = require("./../Controller/AuthController");
const { updateStock } = require("./../Controller/ProductController");
const { createOrder } = require("./../Controller/OrderController");
// params
router.param("userId", getUserById);
// for payment
router.post("/payment", payment);
// for creating order
router.post(
  "/create/:userId",
  varification,
  PushOrderInPurchedList,
  updateStock,
  createOrder
);

module.exports = router;
