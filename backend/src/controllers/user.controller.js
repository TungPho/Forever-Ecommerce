const userModel = require("../models/user.model");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("../services/user.service");
class UserController {
  createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET);
  };

  loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const token = await UserService.loginUser(email, password);
    return res.status(200).json({
      message: "Login success",
      token: token,
    });
  };
  register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const { token, user } = await UserService.registerUser(
      name,
      email,
      password
    );
    return res.status(201).json({
      user: user,
      message: "Create User Success",
      accessToken: token,
    });
  };

  adminLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const token = await UserService.adminLogin(email, password);
    return res.status(200).json({
      accessToken: token,
      message: "Welcome Admin",
    });
  };
}
const userController = new UserController();
module.exports = userController;
