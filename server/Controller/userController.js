const UserModel = require("./../Modal/UserModal");
const { use } = require("../Routes/userRoute");

// left to implement the payment Interagration and Purchase Order
exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await UserModel.findById(id);
    req.profile = user;
    next();
  } catch (error) {
    res.json({
      error,
    });
  }
};
exports.getUserInformation = (req, res) => {
  res.json(req.user);
};
exports.getUserOrder = (req, res) => {
  const { user } = req;
  const { orderProduct } = user;
  res.json({ order: orderProduct });
};
exports.updateUserInfo = async (req, res) => {
  try {
    const { fname, lname, address } = req.body;
    const id = req.user._id;
    const user = await UserModel.findByIdAndUpdate(
      { _id: id },
      {
        fname: fname,
        lname: lname,
        address: address,
      },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.json({
      error,
    });
  }
};
