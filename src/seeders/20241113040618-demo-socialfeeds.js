"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userProfiles = await queryInterface.rawSelect(
      "UserProfiles",
      { plain: false },
      ["User_ID"]
    );

    const userIDs = userProfiles.map((v) => v.User_ID);

    const socialFeeds = [];

    for (let i = 0; i < 10; i++) {
      socialFeeds.push({
        Content: faker.lorem.sentence(),
        Images: [faker.image.url(), faker.image.url()],
        Likes: faker.number.int({ min: 0, max: 100 }),
        User_ID: faker.helpers.arrayElement(userIDs),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("SocialFeeds", socialFeeds, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SocialFeeds", null, {});
  },
};
