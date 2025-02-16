"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [products, userProfiles] = await Promise.all([
      queryInterface.rawSelect("Products", { plain: false }, ["ProductID"]),
      queryInterface.rawSelect("UserProfiles", { plain: false }, ["User_ID"]),
    ]);

    const productIDs = products.map((v) => v.ProductID);
    const userIDs = userProfiles.map((v) => v.User_ID);

    const productReviews = [];
    const likesList = [];
    const dislikesList = [];

    for (let i = 1; i <= 300; i++) {
      const productReview = {
        Title: faker.lorem.sentence(),
        Notes: faker.lorem.paragraph(),
        Rating: faker.number.int({ min: 1, max: 5 }),
        ProductID: faker.helpers.arrayElement(productIDs),
        User_ID: faker.helpers.arrayElement(userIDs),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      productReviews.push(productReview);

      const likes = faker.helpers
        .arrayElements(userIDs, { min: 0, max: 20 })
        .map((userID) => ({
          ReviewID: i,
          User_ID: userID,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

      likesList.push(...likes);

      const dislikes = faker.helpers
        .arrayElements(userIDs, { min: 0, max: 20 })
        .map((userID) => ({
          ReviewID: i,
          User_ID: userID,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

      dislikesList.push(...dislikes);
    }

    await queryInterface.bulkInsert("ProductReviews", productReviews, {});
    if (likesList.length > 0) {
      await queryInterface.bulkInsert(
        "ProductReviewsUserProfilesLikes",
        likesList,
        {}
      );
    }
    if (dislikesList.length > 0) {
      await queryInterface.bulkInsert(
        "ProductReviewsUserProfilesDislikes",
        dislikesList,
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ProductReviews", null, {});
    await queryInterface.bulkDelete(
      "ProductReviewsUserProfilesLikes",
      null,
      {}
    );
    await queryInterface.bulkDelete(
      "ProductReviewsUserProfilesDislikes",
      null,
      {}
    );
  },
};
