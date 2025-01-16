const { createToken } = require("../auth/auth.handler");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
class UserService {
  static async loginUser(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Can't find that user");
    }
    const samePassword = await bcrypt.compare(password, user.password);
    if (!samePassword) {
      throw new Error("Wrong password");
    }
    //access token
    const token = createToken(user._id);
    return token;
  }
  static async registerUser(name, email, password) {
    const emailExist = await userModel.findOne({
      email,
    });
    if (emailExist) {
      throw new Error("Email has already exists");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    if (password.length < 8) {
      throw new Error("Password length must be > 8 chars");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    const token = createToken(user._id);
    return { token, user };
  }
  static async adminLogin(email, password) {
    if (
      !email === process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      throw new Error("Wrong Email Or Password");
    }
    const token = jwt.sign(email + password, process.env.JWT_SECRET);
    return token;
  }
}

module.exports = UserService;
