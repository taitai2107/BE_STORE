const {
  db,
  hashPass,
  processError,
  handleCustomError,
  handleCustomErrorToken,
  createToken,
  jwt,
  Op,
  where,
} = require("./importLib");
class servicesProduct {
  constructor() {}
  async handleGetAllProduct() {
    try {
      const products = await db.Products.findAll({
        include: [
          {
            model: db.Categories,

            attributes: ["CategoryId", "categoryName"],
          },
          {
            model: db.Brands,

            attributes: ["BrandId", "brandName"],
          },
        ],
      });
      console.log(products);
      if (!products) {
        handleCustomError([`Get products fail !`]);
      }
      return {
        EC: 0,
        EM: products,
      };
    } catch (error) {
      processError(error);
    }
  }
  async handleGetDeltailProduct({ productId }) {
    try {
      console.log(productId);
      const DetailtProduct = await db.Products.findOne({
        where: {
          productId: productId,
        },
        include: [
          {
            model: db.Categories,

            attributes: ["CategoryId", "categoryName"],
          },
          {
            model: db.Brands,

            attributes: ["BrandId", "brandName"],
          },
        ],
      });
      if (!DetailtProduct) {
        handleCustomError([`not found Product !`]);
      }
      return {
        EC: 0,
        EM: DetailtProduct,
      };
    } catch (error) {
      processError(error);
    }
  }
}

module.exports = new servicesProduct();
