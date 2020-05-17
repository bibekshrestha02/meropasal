const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  Categories: {
    type: String,
    enum: ["Monitor", "Mobile", "Laptop"],
  },
  Title: {
    type: String,
    required: [true, "Enter Title"],
    unique: [true, "Title Name already Exists"],
  },
  Price: {
    type: Number,
    required: [true, "Enter Price"],
  },
  Rating: {
    type: Number,
    required: [true, "Enter Rating"],
  },
  ItemsLeft: {
    type: Number,
    required: [true, "Enter ItmesLeft"],
  },
  Photo: {
    type: String,
    required: [true, "Please Selece Photo"],
  },
  Date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("products", schema);
