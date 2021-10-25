const express = require("express");
const router = express.Router();
const { getProducts, getProductById, deleteProduct } = require("../controllers/Product");
const { protect, isAdmin } = require('../middleware/auth')

router.route("/").get(getProducts);
router.route("/:id").get(getProductById).delete(protect, isAdmin, deleteProduct)

module.exports = router;
