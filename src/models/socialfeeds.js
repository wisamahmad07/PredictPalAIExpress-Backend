"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SocialFeeds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SocialFeeds.belongsTo(models.UserProfiles, {
        foreignKey: "User_ID",
        targetKey: "User_ID",
      });
      SocialFeeds.hasMany(models.SocialReviews, {
        foreignKey: "SocialFeedID",
      });
    }
  }
  SocialFeeds.init(
    {
      SocialFeedID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      Content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      Likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
      modelName: "SocialFeeds",
    }
  );
  return SocialFeeds;
};
