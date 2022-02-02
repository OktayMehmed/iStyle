const Product = require("../model/Product");

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = (req, res) => {
  const productsInPage = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  Product.find({ ...keyword })
    .limit(productsInPage)
    .skip(productsInPage * (page - 1))
    .then((products) => {
      Product.countDocuments({ ...keyword }).then((count) => {
        res.json({ products, page, pages: Math.ceil(count / productsInPage) });
      });
    });
};

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch(() => res.status(404).json({ message: "Product not find!" }));
};

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        product.remove();
        res.json({ message: "Product was been deleted" });
      }
    })
    .catch(() => res.status(404).json({ message: "Product not find!" }));
};

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = (req, res) => {
  const product = new Product({
    name: "Sample",
    user: req.user._id,
    image: "/images/sample.jpg",
    description: "Sample desc",
    price: 10,
    countInStock: 10,
    numReviews: 0,
  });

  product.save().then((createdProduct) => {
    res.status(201).json(createdProduct);
  });
};

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = (req, res) => {
  const { name, image, description, price, countInStock } = req.body;

  Product.findById(req.params.id).then((product) => {
    if (product) {
      (product.name = name),
        (product.image = image),
        (product.description = description),
        (product.price = price),
        (product.countInStock = countInStock);

      product.save().then((updatedProduct) => {
        res.json(updatedProduct);
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
};

// @desc Create a review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = (req, res) => {
  const { rating, comment } = req.body;

  Product.findById(req.params.id).then((product) => {
    if (product) {
      const alreadyReview = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReview) {
        res.status(400).json({ message: "Product already reviewed" });
        return;
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
};

// @desc Get top three products
// @route GET /api/products/top
// @access Public
const getTopRatedProducts = (req, res) => {
  Product.find({})
    .sort({ rating: -1 })
    .limit(3)
    .then((products) => res.json(products));
};

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopRatedProducts,
};
