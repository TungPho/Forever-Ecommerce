const express = require("express");
const orderController = require("../../controllers/order.controller");
const asyncHandler = require("../../utils/async.handler");
const adminAuth = require("../../middlewares/admin");
const authUser = require("../../middlewares/auth");

const orderRoute = express.Router();
// Admin Features
orderRoute.get(
  "/orders",
  asyncHandler(adminAuth),
  asyncHandler(orderController.getAllOrders)
);
orderRoute.patch(
  "/orders/status",
  asyncHandler(adminAuth),
  asyncHandler(orderController.updateStatus)
);

//Payment features
orderRoute.post(
  "/orders",
  asyncHandler(authUser),
  asyncHandler(orderController.placeOrder)
);
orderRoute.post(
  "/orders/stripe",
  asyncHandler(authUser),
  asyncHandler(orderController.placeOrderStripe)
);
orderRoute.post(
  "/orders/razor",
  asyncHandler(authUser),
  asyncHandler(orderController.placeOrderRazor)
);

// User Feature
orderRoute.get(
  "/orders-user",
  asyncHandler(authUser),
  asyncHandler(orderController.getAllOrdersByUserId)
);

module.exports = orderRoute;
