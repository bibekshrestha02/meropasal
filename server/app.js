const express = require("express");
const orderRoute = require("./Routes/OrderRoute");
const Products = require("./Routes/ProductRoute");
const GlobalErr = require("./Controller/globalError");
const userRoute = require("./Routes/userRoute");
const cartRoute = require("./Routes/CartsRoute");
const AppErr = require("./Utils/AppErr");
const Cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(Cors());
app.use(cookieParser());
app.use("/api", Products);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/cartApi", cartRoute);
app.all("*", (req, res, next) => {
  next(new AppErr("Invalid Url", 400));
});
app.use(GlobalErr);

module.exports = app;
