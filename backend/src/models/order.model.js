const { Types, model, Schema } = require("mongoose");

const COLLECTION_NAME = "Orders";
const DOCUMENT_NAME = "Order";
const OrderSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
    },
    status: {
      type: String,
      required: true,
      default: "Order Placed",
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    payment: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

const orderModel = model(DOCUMENT_NAME, OrderSchema, COLLECTION_NAME);
module.exports = orderModel;
