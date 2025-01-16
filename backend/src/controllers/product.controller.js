const { v2: cloudinary } = require("cloudinary");
const productModel = require("../models/product.model");
const { Types } = require("mongoose");
const ProductService = require("../services/product.service");

class ProductController {
  // request from form-data (files)
  createProduct = async (req, res, next) => {
    try {
      const {
        name,
        description,
        price,
        category,
        sub_category,
        sizes,
        bestseller,
      } = req.body;
      const image1 = req.files.image1 && req.files["image1"][0];
      const image2 = req.files.image2 && req.files["image2"][0];
      const image3 = req.files.image3 && req.files["image3"][0];
      const image4 = req.files.image4 && req.files["image4"][0];
      const images = [image1, image2, image3, image4].filter(
        (i) => i !== undefined
      );
      //upload all the images
      let imageUrl = await Promise.all(
        images.map(async (item) => {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        })
      );
      const newProduct = {
        name,
        description,
        price: price,
        category,
        subCategory: sub_category,
        bestseller: bestseller === "true" ? true : false,
        sizes: JSON.parse(sizes),
        image: imageUrl,
        date: Date.now(),
      };
      const result = await productModel.create(newProduct);
      return res.status(200).json({
        metadata: result,
        message: "Create Product Success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  getAllProducts = async (req, res, next) => {
    const result = await ProductService.getAllProducts();
    return res.status(200).json({
      metadata: result,
      message: "Get all products success",
    });
  };
  removeProduct = async (req, res, next) => {
    const id = req.params.id;
    const foundProduct = await productModel.findById(new Types.ObjectId(id));
    if (!foundProduct) throw new Error("Can't find that product with that id");
    const result = await productModel.findOneAndDelete({
      _id: new Types.ObjectId(id),
    });
    return res.status(200).json({
      metadata: result,
      message: "Delete product success",
    });
  };
  getProductById = async (req, res, next) => {
    const id = req.params.id;
    const foundProduct = await productModel.findById(new Types.ObjectId(id));
    if (!foundProduct) throw new Error("Can't find that product with that id");
    return res.status(200).json({
      metadata: foundProduct,
      message: "Find Product By Id Success!",
    });
  };
  updateProductById = async (req, res, next) => {
    const id = req.params.id;

    const result = await ProductService.updateProductById(id);
    return res.status(200).json({
      result: result,
      message: "Update Product Success",
    });
  };
}
const productController = new ProductController();
module.exports = productController;
