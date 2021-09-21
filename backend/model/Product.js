const mongoose = require('mongoose');
const { ObjectId } = mongoose.SchemaTypes


const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
}, {
  timestamps: true
})

const productSchema = mongoose.Schema({

  user: {
    type: ObjectId,
    required: true,
    ref: 'User'
  },

  name: {
    type: String,
    required: true
  },

  image: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },
  reviews: [reviewSchema],
  ratin: {
    type: Number,
    required: true,
    default: 0
  },

  numReviews: {
    type: Number,
    required: true,
    default: 0
  },

  price: {
    type: Number,
    required: true,
    default: 0
  },

  countInStock: {
    type: Number,
    required: true,
    default: 0
  }

}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product