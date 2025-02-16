"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductsColors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductsColors.init(
    {
      ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "ProductID",
        },
      },
      ColorID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Colors",
          key: "ColorID",
        },
      },
    },
    {
      sequelize,
      modelName: "ProductsColors",
      tableName: "ProductsColors",
    }
  );
  return ProductsColors;
};
