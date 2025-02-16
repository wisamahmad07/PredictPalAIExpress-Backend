"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductReviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductReviews.belongsTo(models.Products, {
        foreignKey: "ProductID",
      });
      ProductReviews.belongsTo(models.UserProfiles, {
        foreignKey: "User_ID",
        targetKey: "User_ID",
        as: "Author",
      });
      ProductReviews.belongsToMany(models.UserProfiles, {
        through: "ProductReviewsUserProfilesLikes",
        foreignKey: "ReviewID",
        otherKey: "User_ID",
        as: "LikedUsers",
      });
      ProductReviews.belongsToMany(models.UserProfiles, {
        through: "ProductReviewsUserProfilesDislikes",
        foreignKey: "ReviewID",
        otherKey: "User_ID",
        as: "DislikedUsers",
      });
    }
  }
  ProductReviews.init(
    {
      ReviewID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Notes: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          max: 5,
        },
      },
      ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "ProductID",
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
      modelName: "ProductReviews",
      tableName: "ProductReviews",
    }
  );
  return ProductReviews;
};
