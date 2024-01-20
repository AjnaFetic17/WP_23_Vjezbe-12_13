const { errorHandler } = require('../helpers/dbErrorHandler');
const Product = require('../models/product')

exports.create = (req, res) => {
  const productIn = req.body;
  let product = new Product(productIn);
  product
    .save()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.list = (req, res) => {
  Product.find({})
    .then((data) => {
      return res.json(data);
    })
    .catch((err) => {
      if ((err = null)) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.read = (req, res) => {
  const productId = req.params.productId;
  Product.findOne({ _id: productId })
    .then((data) => {
      return res.json(data);
    })
    .catch((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.remove = (req, res) => {
  const productId = req.params.productId;
  Product.findOneAndDelete({ _id: productId })
    .then(() => {
      res.json({
        message: "Product deleted successfully",
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};

exports.edit = (req, res) => {
  const productIn = req.body;
  const productId = req.params.productId;

  Product.findOneAndUpdate({ _id: productId }, productIn, {
    new: true,
    upsert: true,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
    });
};
