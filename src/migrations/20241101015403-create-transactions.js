"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      TransactionID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      SaveCard: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ThreeDSecure: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      Description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      StatementDescriptor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Reference: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      Metadata: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      Receipt: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      Redirect: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Transactions");
  },
};
