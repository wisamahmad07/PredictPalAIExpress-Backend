"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductCategories.hasMany(models.Products, {
        foreignKey: "ProductCatID",
        sourceKey: "ProductCatID",
      });
    }
  }
  ProductCategories.init(
    {
      ProductCatID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Parent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductCategories",
      tableName: "ProductCategories",
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
  return ProductCategories;
};
