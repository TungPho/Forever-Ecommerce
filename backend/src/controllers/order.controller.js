const orderModel = require("../models/order.model");
const userModel = require("../models/user.model");
const Stripe = require("stripe");
//global
const currency = "inr";
const deliveryCharge = 10;
// initialize gateway
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class OrderController {
  placeOrder = async (req, res, next) => {
    const { userId, items, amount, address } = req.body;
    console.log(items, amount, address);
    const orderData = {
      address,
      userId,
      items,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const result = await orderModel.create(orderData);

    // reset the user cart
    const update = await userModel.findByIdAndUpdate(userId, {});
    console.log(update);
    return res.status(200).json({
      metadata: result,
      message: "Create new order success",
    });
  };

  placeOrderStripe = async (req, res, next) => {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      address,
      userId,
      items,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const result = await orderModel.create(orderData);
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });
    return res.status(200).json({
      session: session.url,
      message: "Get all orders success",
    });
  };

  placeOrderRazor = async (req, res, next) => {};
  // for admin: get all orders from the users
  // admin Auth
  getAllOrders = async (req, res, next) => {
    const orders = await orderModel.find({});
    return res.status(200).json({
      orders: orders,
      message: "Get all orders success",
    });
  };
  // userAuth
  getAllOrdersByUserId = async (req, res, next) => {
    const { userId } = req.body;
    const orders = await orderModel.find({
      userId: userId,
    });
    console.log(orders);
    return res.status(200).json({
      result: orders,
      message: "Get all orders of one user by id",
    });
  };
  // update Order status
  updateStatus = async (req, res, next) => {
    const { orderId, status } = req.body;
    const result = await orderModel.findByIdAndUpdate(orderId, {
      $set: {
        status: status,
      },
    });
    return res.status(200).json({
      result: result,
      message: "Status Updated",
    });
  };
}

module.exports = new OrderController();
