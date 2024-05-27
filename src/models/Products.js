"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Brands, { foreignKey: "brandId" });
      this.belongsTo(models.Categories, { foreignKey: "categoryId" });
      this.hasMany(models.OrderDetails, { foreignKey: "productId" });
    }
  }
  Products.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      desciption: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Products",
      tableName: "Products",
    }
  );
  return Products;
};
