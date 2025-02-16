"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Colors.belongsToMany(models.Products, {
        through: "ProductsColors",
        foreignKey: "ColorID",
        otherKey: "ProductID",
      });
    }
  }
  Colors.init(
    {
      ColorID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Value: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Colors",
      tableName: "Colors",
      defaultScope: {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    }
  );
  return Colors;
};
