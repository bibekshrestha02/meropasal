const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Must have first name"],
  },
  lname: {
    type: String,
    required: [true, "Must have last name"],
  },
  email: {
    type: String,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Please Enter validate email",
    },
    unique: [true, "Email already Exist"],
  },
  role: {
    type: String,
    default: "user",
  },
  gender: {
    type: String,
    required: [true, "Please Select your gender"],
  },
  password: {
    type: String,
    required: [true, "please Enter your Password"],
    select: false,
  },
  conformPassword: {
    type: String,
    required: [true, "please Enter Conform Password"],
    validate: {
      validator: function (v) {
        return this.password === v;
      },
      message: "Password Doesnt matched",
    },
  },
  purchases: {
    type: Array,
    default: [],
  },
  carts: {
    type: Array,
    default: [],
  },
});
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 8);
  this.conformPassword = undefined;
});
userSchema.methods.CheckPassword = function (userPassword, correctPassword) {
  return bcrypt.compare(userPassword, correctPassword);
};
const User = mongoose.model("users", userSchema);

module.exports = User;
