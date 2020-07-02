const ProductModel = require("./../Modal/ProductModel");
const catchAsync = require("./../Utils/CatchAsync");
// getting monitors
exports.getAllMonitors = catchAsync(async (req, res, next) => {
  const data = await ProductModel.find({ Categories: "Monitor" });
  res.status(200).json({
    status: "success",
    data,
  });
});

// geting the mobiles
exports.getAllMobiles = catchAsync(async (req, res, next) => {
  const data = await ProductModel.find({ Categories: "Mobile" });
  res.status(200).json({
    status: "success",
    data,
  });
});
// geting the Laptops
exports.getAllLaptops = catchAsync(async (req, res, next) => {
  const data = await ProductModel.find({ Categories: "Laptop" });
  res.status(200).json({
    status: "success",
    data,
  });
});
// adding the Products
exports.addProducts = catchAsync(async (req, res, next) => {
  const data = {
    Categories: req.body.Categories,
    Title: req.body.Title,
    Price: req.body.Price,
    Rating: req.body.Rating,
    ItemsLeft: req.body.ItemsLeft,
    Photo: req.body.Photo,
  };
  await ProductModel.create(data);
  res.status(200).json({
    status: "Success",
  });
});

// updating the products
exports.updateProducts = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = {
    Categories: req.body.Categories,
    Title: req.body.Title,
    Price: req.body.Price,
    Rating: req.body.Rating,
    ItemsLeft: req.body.ItemsLeft,
    Photo: req.body.Photo,
  };
  const updatedData = await ProductModel.findByIdAndUpdate({ _id: id }, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  // const updatedData = await ProductModel.findOneAndUpdate(
  //   { Categories: Categories, Title: Title },
  //   data,
  //   {
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   }
  // );
  res.status(200).json({
    status: "success",
    updatedData,
  });
});
// deleting the products
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await ProductModel.findByIdAndDelete({ _id: id });
  res.status(200).json({
    status: "success",
  });
});

// caterogies
exports.Categories = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await ProductModel.findById({ _id: id });
  const relatedItems = await ProductModel.find({ _id: { $ne: id } }).limit(4);
  res.status(200).json({
    status: "success",
    data,
    relatedItems,
  });
});
// for home
exports.Home = catchAsync(async (req, res, next) => {
  const bestSells = await ProductModel.find({ Rating: { $gte: 3 } }).limit(4);
  const latestProdut = await ProductModel.find({ Rating: { $lte: 3 } })
    .sort({ date: 1 })
    .limit(4);
  res.json({
    status: "Success",
    bestSells,
    latestProdut,
  });
});
// searching Items
exports.searchItems = catchAsync(async (req, res, next) => {
  const seachTitle = req.params.search;
  const SearchItems = await ProductModel.find({
    $text: { $search: `${seachTitle}s`, $caseSensitive: false },
  });
  res.status(200).json({
    status: "Success",
    SearchItems,
  });
});

exports.uploadPhoto = async (req, res) => {
  const data = req.files[0].filename;
  res.status(200).json({ fileName: data });
};

//middleware to update the quantity in stock
exports.updateStock = (req, res, next) => {
  let myopertation = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { ItemLeft: -prod.count } },
      },
    };
  });
  ProductModel.bulkWrite(myopertation, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "bulk operation faild",
      });
    }
  });
  next();
};
