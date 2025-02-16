"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed data for Brands
    await queryInterface.bulkInsert(
      "Brands",
      [
        {
          Name: "Nike",
          Description: faker.company.catchPhrase(),
          Logo: faker.image.url(),
          Url: "https://www.nike.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Adidas",
          Description: faker.company.catchPhrase(),
          Logo: faker.image.url(),
          Url: "https://www.adidas.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Puma",
          Description: faker.company.catchPhrase(),
          Logo: faker.image.url(),
          Url: "https://www.puma.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Under Armour",
          Description: faker.company.catchPhrase(),
          Logo: faker.image.url(),
          Url: "https://www.underarmour.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Commands to revert seed
    await queryInterface.bulkDelete("Brands", null, {});
  },
};
