const fs = require("fs");
const Mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config({ path: ".././config.env" });
const ProductModel = require("./../Modal/ProductModel");

const Productdata = JSON.parse(
  fs.readFileSync("./api/productApi.json", "utf-8")
);
Mongoose.connect(process.env.LOCAL_DB, {
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
    console.log("successfully add Monitors");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

if (process.argv[2] === "---product") {
  Product();
}
