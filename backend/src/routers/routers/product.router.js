const express = require("express");
const productController = require("../../controllers/product.controller");
const upload = require("../../middlewares/multer");
const asyncHandler = require("../../utils/async.handler");
const adminAuth = require("../../middlewares/admin");
const productRoute = express.Router();

productRoute.get("/products", productController.getAllProducts);

productRoute.post(
  "/products",
  asyncHandler(adminAuth),
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  productController.createProduct
);
productRoute.put(
  "/products",
  asyncHandler(adminAuth),
  productController.createProduct
);
productRoute.delete(
  "/products/:id",
  asyncHandler(adminAuth),
  productController.removeProduct
);

module.exports = productRoute;
