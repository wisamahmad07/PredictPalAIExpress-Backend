"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductReviewsUserProfilesDislikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductReviewsUserProfilesDislikes.init(
    {
      ReviewID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ProductReviews",
          key: "ReviewID",
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
      modelName: "ProductReviewsUserProfilesDislikes",
      tableName: "ProductReviewsUserProfilesDislikes",
    }
  );
  return ProductReviewsUserProfilesDislikes;
};
