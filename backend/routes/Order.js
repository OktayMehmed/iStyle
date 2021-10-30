const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
  getAllOrders,
} = require("../controllers/Order");
const { protect, isAdmin } = require("../middleware/auth");

router
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, isAdmin, getAllOrders);
router.route("/myorders").get(protect, getUserOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

module.exports = router;s
