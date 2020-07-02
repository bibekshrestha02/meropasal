const Express = require("express");
const {
  signUp,
  login,
  signout,
  updatePassword,
} = require("./../Controller/AuthController");
const { varification, checkRole } = require("./../Controller/AuthController");
const {
  getUserInformation,
  updateUserInfo,
  getUserOrder,
} = require("./../Controller/userController");
const Router = Express.Router();

Router.post("/signup", signUp);
Router.post("/login", login);
Router.post("/logout", signout);

Router.route("/")
  .get(varification, getUserInformation)
  .patch(varification, updatePassword)
  .put(varification, updateUserInfo);
Router.route("/order").get(varification, getUserOrder);

module.exports = Router;
