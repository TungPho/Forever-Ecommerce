const { Types } = require("mongoose");
const userModel = require("../models/user.model");

class CartController {
  // get user's cart data
  getUserCartById = async (req, res, next) => {
    const { userId } = req.body;
    const userCart = await userModel.findById(new Types.ObjectId(userId));
    res.status(200).json({
      metadata: userCart.cartData,
      message: "Get Cart Success",
    });
  };
  // add products to user cart
  // authorize first // then add
  addToCart = async (req, res, next) => {
    const { userId, itemId, size } = req.body;
    const userData = await userModel.findById(userId);
    console.log(userData);
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
    res.status(200).json({
      result: result,
      message: "Add to Cart Success",
    });
  };
  updateUserCart = async (req, res, next) => {
    // update the quantity by the itemid
    const { userId, itemId, size, quantity } = req.body;
    console.log(userId, itemId, size, quantity);
    if (quantity <= 0) throw new Error("Quantity cannot be <= 0 ");
    const user = await userModel.findById(userId);
    if (!user) throw new Error("Can not found cart's user");
    const userCart = user.cartData;
    // already have, so let's change the quantity
    userCart[itemId][size] = quantity;

    // update
    const result = await userModel.findByIdAndUpdate(userId, {
      $set: {
        cartData: userCart,
      },
    });
    res.status(200).json({
      result: result,
      message: "Update Cart Success",
    });
  };
}
module.exports = new CartController();
