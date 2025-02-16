"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      OrderID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      CustomerID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "UserProfiles",
          key: "User_ID",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      Currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "USD",
      },
      Items: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: false,
        defaultValue: [],
      },
      Shipping: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      Taxes: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: true,
      },
      Status: {
        type: Sequelize.ENUM([
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
        type: Sequelize.JSON,
        allowNull: false,
      },
      BillingAddress: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
