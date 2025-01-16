const { model, Schema } = require("mongoose");
const COLLECTION_NAME = "Products";
const DOCUMENT_NAME = " Products";
const productSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  bestseller: {
    type: Boolean,
    required: true,
  },
});

const productModel = model(DOCUMENT_NAME, productSchema, COLLECTION_NAME);
module.exports = productModel;
