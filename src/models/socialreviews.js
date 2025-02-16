"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SocialReviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SocialReviews.belongsTo(models.SocialFeeds, {
        foreignKey: "SocialReviewID",
      });
      SocialReviews.belongsTo(models.UserProfiles, {
        foreignKey: "User_ID",
        targetKey: "User_ID",
      });
    }
  }
  SocialReviews.init(
    {
      SocialReviewID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SocialFeedID: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "SocialFeeds",
          key: "SocialFeedID",
        },
      },
      User_ID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "UserProfiles",
          key: "User_ID",
        },
      },
    },
    {
      sequelize,
      modelName: "SocialReviews",
    }
  );
  return SocialReviews;
};
