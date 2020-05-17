const UserModel = require("./../Modal/UserModal");
const ProductModel = require("./../Modal/ProductModel");
const CatchAsync = require("./../Utils/CatchAsync");
// geting the carts itmes
exports.getCarts = CatchAsync(async (req, res, next) => {
  const { email } = req.user;
  let Carts = await UserModel.aggregate([
    { $match: { email: email } },
    {
      $unwind: "$carts",
    },
  ]);
  if (Carts.length === 0) {
    return res.json({
      status: "fail",
      message: "No Items",
    });
  }
  Carts = await UserModel.aggregate([
    { $match: { email: email } },
    {
      $unwind: "$carts",
    },
    {
      $group: {
        _id: {
          _id: "$carts._id",
          Title: "$carts.Title",
          Price: "$carts.Price",
          Photo: "$carts.Photo",
          ItemsLeft: "$carts.ItemsLeft",
          Categories: "$carts.Categories",
        },
        Order: {
          $sum: "$carts.Order",
        },
      },
    },
    {
      $project: {
        _id: 0,
        Order: 1,
        id: "$_id._id",
        Photo: "$_id.Photo",
        Categories: "$_id.Categories",
        ItemsLeft: "$_id.ItemsLeft",
        Price: "$_id.Price",
        Title: "$_id.Title",
        Total: { $multiply: ["$_id.Price", "$Order"] },
      },
    },
  ]);
  // Add the total price of Carts
  const subTotal = () => {
    const total = Carts.map((e) => {
      const sumArr = [];
      sumArr.push(e.Total);
      return sumArr[0];
    });
    const sum = total.reduce((i, e) => {
      return i + e;
    });
    return sum;
  };

  res.json({
    status: "success",
    Carts,
    subTotal: subTotal(),
  });
});
// inserting items into carts
exports.createCarts = CatchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { productId } = req.body;
  const productData = await ProductModel.findById({ _id: productId });
  const data = {
    _id: productData._id,
    Categories: productData.Categories,
    Title: productData.Title,
    Price: productData.Price,
    ItemsLeft: productData.ItemsLeft,
    Photo: productData.Photo,
    Order: req.body.order,
  };
  await UserModel.findByIdAndUpdate(
    { _id: _id },
    { $push: { carts: data } },
    {
      new: true,
    }
  );

  res.json({
    status: "Success",
  });
});
// deleting the itmes from carts
exports.deleteCarts = CatchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const carts = [];
  const data = await UserModel.findByIdAndUpdate(
    { _id: _id },
    { carts },
    {
      new: true,
    }
  );
  res.send("deleted");
});
// deleting the single items form carts
exports.deleteSingleCarts = CatchAsync(async (req, res, next) => {
  // product id
  const { title } = req.params;
  // user Id
  const UserId = req.user._id;
  await UserModel.update(
    { _id: UserId },
    { $pull: { carts: { Title: title } } }
  );
  next();
});
// updating the items
exports.updateCartsItems = CatchAsync(async (req, res, next) => {
  const { title } = req.params;
  const UserId = req.user._id;
  const newCount = req.body.Count;
  await UserModel.update(
    { _id: UserId, "carts.Title": title },
    { $set: { "carts.$.Order": newCount } }
  );
  next();
});
