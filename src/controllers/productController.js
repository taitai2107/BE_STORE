const { param } = require("express/lib/router");
const servicesProduct = require("../services/product_services");
class ProductController {
  constructor() {}
  async getAllProducts(req, res, next) {
    try {
      let response = await servicesProduct.handleGetAllProduct();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
  async getDeltailProducts(req, res, next) {
    try {
      let response = await servicesProduct.handleGetDeltailProduct(req.query);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new ProductController();
