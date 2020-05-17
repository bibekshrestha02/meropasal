const UserModel = require("./../Modal/UserModal");
const order = require("./../Modal/orderModel");
const stripe = require("stripe")("sk_test_9Amkul87CAt6w97GRuBzfbG300g4Aqctgt");
const { v4: uuidv4 } = require("uuid");
// TODO left to implement the payment Interagration and Purchase Order
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
exports.payment = (req, res) => {
  // const { product, token } = req.body;
  // const idompontencyKey = uuidv4();
  // return stripe.customers
  //   .create({
  //     email: token.email,
  //     source: token.id,
  //   })
  //   .then((customer) => {
  //     stripe.charges.create(
  //       {
  //         amount: product.map((e) => e.Price),
  //         currency: "npr",
  //         customer: customer.id,
  //         receipt_email: token.email,
  //         description: product.map((e) => e.Title),
  //         shipping: {
  //           name: token.card.name,
  //           address: {
  //             country: token.card.address_country,
  //           },
  //         },
  //       },
  //       {
  //         idompontencyKey,
  //       }
  //     );
  //   })
  //   .catch((err) => console.log(err));
  res.json({
    status: "Success",
  });
};
exports.PushOrderInPurchedList = async (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      categories: product.categories,
      quantity: product.qunatity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  UserModel.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    {
      new: true,
    },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "unable to save purched list",
        });
      }
    }
  );

  next();
};
