"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [feeds, userProfiles] = await Promise.all([
      queryInterface.rawSelect("SocialFeeds", { plain: false }, ["SocialFeedID"]),
      queryInterface.rawSelect("UserProfiles", { plain: false }, ["User_ID"]),
    ]);

    const feedIDs = feeds.map((v) => v.SocialFeedID);
    const userIDs = userProfiles.map((v) => v.User_ID);

    const socialReviews = [];

    for (let i = 0; i < 10; i++) {
      socialReviews.push({
        Content: faker.lorem.sentence(),
        SocialFeedID: faker.helpers.arrayElement(feedIDs),
        User_ID: faker.helpers.arrayElement(userIDs),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("SocialReviews", socialReviews, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("SocialReviews", null, {});
  },
};
