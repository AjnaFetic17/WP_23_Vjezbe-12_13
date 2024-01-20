const express = require('express')
const router = express.Router()
const { create, list, read, remove, edit } = require("../services/product");

const { runValidation } = require("../validators/index");
const { productCreateValidator } = require("../validators/product");
const { requireLogin } = require('../services/auth');

router.post("/products", productCreateValidator, runValidation, requireLogin, create);
router.get("/products", list);
router.get("/products/:productId", read);
router.delete("/products/:productId", remove, requireLogin);
router.put("/products/:productId", edit, requireLogin);

module.exports = router;
