const Express = require("express");
const { signUp, login, signout } = require("./../Controller/AuthController");
const { varification } = require("./../Controller/AuthController");
const { getUserInformation } = require("./../Controller/userController");
const Route = Express.Router();

Route.post("/signup", signUp);
Route.post("/login", login);
Route.post("/logout", signout);
Route.get("/data", varification, getUserInformation);

module.exports = Route;
