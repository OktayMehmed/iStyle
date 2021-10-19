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
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    order
      .save()
      .then((createdUser) => res.status(201).json(createdUser))
      .catch((e) => console.error(e));
  }
};

// @desc Get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = (req, res) => {
  Order.findById(req.params.id).populate('user', 'name email').then(order => {
    if(order){
      res.json(order)
    } else {
      res.status(404).json({message: 'Order not found'})
    }
  })
};

module.exports = { addOrderItems, getOrderById };
