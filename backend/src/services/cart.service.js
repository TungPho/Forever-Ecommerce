const userModel = require("../models/user.model");

class CartService {
  static async getUserCartById(userId) {
    const userCart = await userModel.findById(new Types.ObjectId(userId));
    return userCart;
  }
  static async addToCart(userId, itemId, size) {
    const userData = await userModel.findById(userId);
    if (!userData) throw new Error("Can't find user's cart");
    let cartData = await userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      // intialize the object and quantity = 1
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    const result = await userModel.findByIdAndUpdate(userId, {
      $set: {
        cartData: cartData,
      },
    });
    return result;
  }
}
module.exports = CartService;
