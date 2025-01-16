const productModel = require("../models/product.model");

class ProductService {
  static async createProduct(newProduct) {
    const result = await productModel.create(newProduct);
    return result;
  }

  static async getAllProducts() {
    const result = await productModel.find({});
    return result;
  }
  static async updateProductById(id) {
    const foundProduct = await productModel.findById(new Types.ObjectId(id));
    if (!foundProduct) throw new Error("Can't find that product with that id");
  }
}

module.exports = ProductService;
