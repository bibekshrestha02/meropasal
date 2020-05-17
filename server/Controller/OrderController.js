const { Order } = require("./../Modal/orderModel");
//  for new order
exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "failed to save your order in DB",
      });
    }
    res.json(order);
  });
};
