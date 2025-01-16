const express = require("express");
const userRoute = require("./routers/user.router");
const productRoute = require("./routers/product.router");
const cartRoute = require("./routers/cart.router");
const orderRoute = require("./routers/order.router");

const mainRoute = express.Router();

mainRoute.use("/api/v1", userRoute);
mainRoute.use("/api/v1", productRoute);
mainRoute.use("/api/v1", cartRoute);
mainRoute.use("/api/v1", orderRoute);
module.exports = mainRoute;
