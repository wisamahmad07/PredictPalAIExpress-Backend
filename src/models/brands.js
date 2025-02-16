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
      Brands.hasMany(models.Products, {
        foreignKey: "BrandID",
        sourceKey: "BrandID",
      });
    }
  }
  Brands.init(
    {
      BrandID: {
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
      Logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Brands",
      tableName: "Brands",
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
  return Brands;
};
