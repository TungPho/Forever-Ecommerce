const express = require("express");
const cartController = require("../../controllers/cart.controller");
const asyncHandler = require("../../utils/async.handler");
const authUser = require("../../middlewares/auth");

const cartRoute = express.Router();

cartRoute.post("/cart", asyncHandler(authUser), cartController.addToCart);
cartRoute.get(
  "/cart",
  asyncHandler(authUser),
  asyncHandler(cartController.getUserCartById)
);
cartRoute.put("/cart", asyncHandler(authUser), cartController.updateUserCart);

module.exports = cartRoute;
