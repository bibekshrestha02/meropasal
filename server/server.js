const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require("express");
const orderRoute = require("./Routes/OrderRoute");
const Products = require("./Routes/ProductRoute");
const GlobalErr = require("./Controller/globalError");
const userRoute = require("./Routes/userRoute");
const cartRoute = require("./Routes/CartsRoute");
const AppErr = require("./Utils/AppErr");
const Cors = require("cors");
const cookieParser = require("cookie-parser");
const db = process.env.MONGODB.replace("<password>", process.env.PASSWORD);
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("sucessfully connected to db");
  });
const app = express();
app.use(express.json());
app.use(Cors());
app.use(cookieParser());
app.use("/api", Products);
app.use("/user", userRoute);
app.use("/order", orderRoute);
app.use("/cartApi", cartRoute);

app.use(GlobalErr);
app.use(express.static("../client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "build", "index.html")); // relative path
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server Started on port ${PORT}`);
});
