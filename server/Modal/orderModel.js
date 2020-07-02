const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: String,
  name: String,
  address: Object,
  contact: Number,
  date: {
    type: Date,
    default: Date.now(),
  },
  product: {
    type: Object,
  },
});

module.exports = mongoose.model("Order", orderSchema);
