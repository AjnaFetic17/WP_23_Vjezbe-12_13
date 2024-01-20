const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
    max: 150
  },
  content: {
    type: String,
    required: [true, 'Product content is required'],
    trim: true,
    max: 255
  },
  imageURL: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required']
  },
  categories: [{
    type: ObjectId,
    ref: 'Category',
    required: true
  }],
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)