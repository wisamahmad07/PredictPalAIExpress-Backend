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
      Products.belongsTo(models.Brands, { foreignKey: "BrandID" });
      Products.belongsTo(models.ProductCategories, {
        foreignKey: "ProductCatID",
      });
      Products.belongsToMany(models.Colors, {
        through: "ProductsColors",
        foreignKey: "ProductID",
        otherKey: "ColorID",
      });
      Products.belongsToMany(models.Sizes, {
        through: "ProductsSizes",
        foreignKey: "ProductID",
        otherKey: "SizeID",
      });
      Products.hasMany(models.ProductReviews, {
        foreignKey: "ProductID",
      });
    }
  }
  Products.init(
    {
      ProductID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ShortDesc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      BrandID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Brands",
          key: "BrandID",
        },
      },
      ProductCatID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ProductCategories",
          key: "ProductCatID",
        },
      },
      Images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      Price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      Stock: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        defaultValue: [],
      },
      ReturnPolicy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Material: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "UNKNOWN",
      },
    },
    {
      sequelize,
      modelName: "Products",
      tableName: "Products",
    }
  );
  return Products;
};
