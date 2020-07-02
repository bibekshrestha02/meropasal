const fs = require("fs");
const Mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config({ path: ".././config.env" });
const ProductModel = require("./../Modal/ProductModel");

const Productdata = JSON.parse(
  fs.readFileSync("./api/productApi.json", "utf-8")
);
const db = process.env.MONGODB.replace("<password>", process.env.PASSWORD);

Mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((res) => {
    console.log("sucessfully connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const Product = async () => {
  try {
    await ProductModel.create(Productdata);
    console.log("successfully add Products");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

Product();
