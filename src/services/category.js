const { errorHandler } = require('../helpers/dbErrorHandler');
const Category = require('../models/category')

exports.create = (req, res) => {
  const categoryIn = req.body;
  let category = new Category(categoryIn);
  category
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
  Category.find({})
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
  const categoryId = req.params.categoryId;
  Category.findOne({ _id: categoryId })
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
  const categoryId = req.params.categoryId;
  Category.findOneAndDelete({ _id: categoryId })
    .then(() => {
      res.json({
        message: "Category deleted successfully",
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
  const categoryIn = req.body;
  const categoryId = req.params.categoryId;

  Category.findOneAndUpdate({ _id: categoryId }, categoryIn, {
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
