'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SocialReviews', {
      SocialReviewID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      SocialFeedID: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: "SocialFeeds",
          key: "SocialFeedID",
        },
      },
      User_ID: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "UserProfiles",
          key: "User_ID",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SocialReviews');
  }
};