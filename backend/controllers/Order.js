const Order = require("../model/Order");

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No order items" });
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user_id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    order.save().then((createdUser) => res.status(201).json(createdUser))
  }
};

module.exports = { addOrderItems };
