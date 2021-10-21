const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} = require("../controllers/Order");
const { protect } = require("../middleware/auth");

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").get(protect, updateOrderToPaid);

module.exports = router;
