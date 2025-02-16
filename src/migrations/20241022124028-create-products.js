"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      ProductID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ShortDesc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      BrandID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Brands",
          key: "BrandID",
        },
      },
      ProductCatID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "ProductCategories",
          key: "ProductCatID",
        },
      },
      Images: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: [],
      },
      Price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      Stock: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        allowNull: false,
        defaultValue: [],
      },
      ReturnPolicy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Material: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "UNKNOWN",
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
    await queryInterface.dropTable("Products");
  },
};
