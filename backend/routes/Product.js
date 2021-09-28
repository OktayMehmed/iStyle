const express = require("express");
const router = express.Router();

const Product = require("../model/Product");

// Fetch all products
// GET /api/products
router.get("/", (req, res) => {
  Product.find().then((products) => res.json(products));
});

// Fetch single product
// GET /api/products/:id
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(404) ? res.json('Product not found!') : console.error(err))

})

module.exports = router
