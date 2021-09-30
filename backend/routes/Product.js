const express = require("express");
const router = express.Router();

const Product = require("../model/Product");

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.get("/", (req, res) => {
  Product.find().then((products) => res.json(products));
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
router.get("/:id", (req, res) => {

  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch(() => res.status(404).json({message: 'Product not find!'}))
});

module.exports = router;
