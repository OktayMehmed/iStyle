const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
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
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);

module.exports = router;
