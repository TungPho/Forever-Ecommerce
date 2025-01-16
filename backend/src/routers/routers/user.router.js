const express = require("express");
const userController = require("../../controllers/user.controller");
const asyncHandler = require("../../utils/async.handler");
const userRoute = express.Router();

userRoute.post("/register", asyncHandler(userController.register));
userRoute.post("/login", asyncHandler(userController.loginUser));
userRoute.post("/admin", asyncHandler(userController.adminLogin));

module.exports = userRoute;
