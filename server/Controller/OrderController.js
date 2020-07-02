const Order = require("./../Modal/orderModel");
const User = require("./../Modal/UserModal");
//  for new order
exports.createOrder = async (req, res, next) => {
  try {
    const { fname, lname, email, _id } = req.user;
    const { carts } = req;
    const { contact, address } = req.body;
    const data = {
      product: carts,
      address,
      contact,
      name: `${fname} ${lname}`,
      userEmail: email,
    };
    await Order.create(data);
    await User.findByIdAndUpdate(
      { _id: _id },
      { $push: { orderProduct: [{ date: Date.now() }, { orders: carts }] } },
      {
        new: true,
      }
    );
    next();
  } catch (error) {
    res.json(error);
  }
};

exports.getOrder = async (req, res) => {
  try {
    const result = await Order.find({});
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete({ _id: id });
    res.json({
      status: "success",
    });
  } catch (error) {
    res.json(error);
  }
};
