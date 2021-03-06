const user = require("./../Modal/UserModal");
const catchAsync = require("./../Utils/CatchAsync");
const jwtToken = require("jsonwebtoken");
const appErr = require("./../Utils/AppErr");
const { promisify } = require("util");

const tokenFn = function (id) {
  return jwtToken.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, ...id },
    process.env.JWT_SECRET
  );
};
// for sigUp
exports.signUp = catchAsync(async (req, res, next) => {
  const datas = {
    fname: req.body.fname,
    lname: req.body.lname,
    password: req.body.password,
    conformPassword: req.body.conformPassword,
    gender: req.body.gender,
    email: req.body.email,
    role: req.body.role,
  };

  const data = await user.create(datas);
  const userData = {
    id: data._id,
    name: data.fname,
    role: data.role,
  };
  const token = tokenFn(userData);
  res.status(200).json({
    status: "sucess",
    token,
  });
});
// for login
exports.login = catchAsync(async (req, res, next) => {
  // 1.check if email and password exist
  const { email } = req.body;
  const { password } = req.body;
  if (!email || !password) {
    return next(new appErr("Please Enter Your Password and Email", 400));
  }
  // 2.check if user exists and password is correct
  const data = await user
    .findOne({ email: email })
    .select({ password: 1, fname: 1, role: 1 });
  if (!data || !(await data.CheckPassword(password, data.password))) {
    return next(new appErr("Invalid Email or Password", 400));
  }
  const userData = {
    id: data._id,
    name: data.fname,
    role: data.role,
  };
  // 3.if everything ok , send token to client
  const token = tokenFn(userData);

  res.status(200).json({
    status: "success",
    token,
  });
});
//Update Password
exports.updatePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword, conformPassword } = req.body;
    if (!newPassword || !currentPassword || !conformPassword) {
      throw "Please Enter Password";
    }
    const data = await user.findById({ _id: userId }).select("+password");
    // 1. checking the current password
    if (!(await data.CheckPassword(currentPassword, data.password))) {
      throw "Current password is not matched";
    }
    // 2. updating the password
    data.password = newPassword;
    data.conformPassword = conformPassword;
    await data.save();
    const tokenData = {
      id: data._id,
      name: data.fname,
      role: data.role,
    };
    // 3.if everything ok , send token to client
    const token = tokenFn(tokenData);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res.json({ error });
  }
};

// for protecting the routes i.e login or not
exports.varification = async (req, res, next) => {
  try {
    // 1. getting token and check if its there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw "You are not logged in! Please log in to get access.";
    }

    // 2. verfication token
    const status = await promisify(jwtToken.verify)(
      token,
      process.env.JWT_SECRET
    );

    // 3. check if user still exists
    const freshUser = await user.findById(status.id);
    if (!freshUser) {
      return next(new appErr("User doesn't exist", 402));
    }
    req.user = freshUser;
    next();
  } catch (error) {
    res.json(error);
  }
};
// for checking the role
exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return next(new appErr("You are not allowed to access this route", 402));
    }
    next();
  };
};
// for signing out
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};
