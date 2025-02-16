"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductsSizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductsSizes.init(
    {
      ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "ProductID",
        },
      },
      SizeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Sizes",
          key: "SizeID",
        },
      },
    },
    {
      sequelize,
      modelName: "ProductsSizes",
      tableName: "ProductsSizes",
    }
  );
  return ProductsSizes;
};
