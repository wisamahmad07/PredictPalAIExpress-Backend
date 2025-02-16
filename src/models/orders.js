"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      // define association here
      Orders.belongsTo(models.UserProfiles, {
        foreignKey: "CustomerID",
        targetKey: "User_ID",
      });
    }
  }
  Orders.init(
    {
      OrderID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      CustomerID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "UserProfiles",
          key: "User_ID",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      Currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USD",
      },
      Items: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
        defaultValue: [],
      },
      Shipping: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      Taxes: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: true,
      },
      Status: {
        type: DataTypes.ENUM([
          "created",
          "paid",
          "shipping",
          "delivered",
          "refunded",
        ]),
        allowNull: false,
        defaultValue: "created",
      },
      ShippingAddress: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      BillingAddress: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
