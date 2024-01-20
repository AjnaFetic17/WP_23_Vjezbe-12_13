const { check } = require("express-validator");

exports.productCreateValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ max: 150 })
    .withMessage("Product name must be 255 characters max"),
  check("content")
    .notEmpty()
    .withMessage("Product content is required")
    .isLength({ max: 255 })
    .withMessage("Product content must be 255 characters max"),
  check("price")
    .notEmpty()
    .withMessage("Price is required"),
];
