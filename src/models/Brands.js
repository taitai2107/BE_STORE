"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Brands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Products, { foreignKey: "brandId" });
    }
  }
  Brands.init(
    {
      brandId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      brandName: DataTypes.STRING,
      desciption: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Brands",
      tableName: "Brands",
    }
  );
  return Brands;
};
