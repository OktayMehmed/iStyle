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

// @desc Update order to paid
// @route PUT /api/orders/:id
// @access Private
const updateOrderToPaid = (req, res) => {
  Order.findById(req.params.id).then(order => {
    if(order){
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address
      }

      order.save().then(updatedOrder => res.json(updatedOrder))
    } else {
      res.status(404).json({message: 'Order not found'})
    }
  })
};

// @desc Get logged in user orders
// @route PUT /api/orders/myorders
// @access Private
const getUserOrders = (req, res) => {
  Order.find({user: req.user._id}).then(orders => {
    res.json(orders)
  })
};

// @desc Get all orders
// @route GET /api/orders
// @access Private/Admin
const getAllOrders = (req, res) => {
  Order.find({}).populate('user', 'id name').then(orders => {
    res.json(orders)
  })
};

module.exports = { addOrderItems, getOrderById, updateOrderToPaid, getUserOrders, getAllOrders };
