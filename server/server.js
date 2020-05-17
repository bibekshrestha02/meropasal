const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
mongoose
  .connect(process.env.LOCAL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("sucessfully connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
const port = process.env.Port;
app.listen(port, () => {
  console.log(`server Started on port ${port}`);
});
