"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sizes.belongsToMany(models.Products, {
        through: "ProductsSizes",
        foreignKey: "SizeID",
        otherKey: "ProductID",
      });
    }
  }
  Sizes.init(
    {
      SizeID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ShortCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Chest: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
      Waist: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Sizes",
      tableName: "Sizes",
    }
  );
  return Sizes;
};
