"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transactions.init(
    {
      TransactionID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      SaveCard: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ThreeDSecure: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      StatementDescriptor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Reference: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      Metadata: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      Receipt: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      Redirect: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Transactions",
    }
  );
  return Transactions;
};
