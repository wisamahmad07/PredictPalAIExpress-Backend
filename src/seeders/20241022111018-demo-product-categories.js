"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed data for ProductCategories
    await queryInterface.bulkInsert(
      "ProductCategories",
      [
        {
          Name: "Sandals",
          Description: faker.lorem.sentence(),
          Parent: "Shoes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Sneakers",
          Description: faker.lorem.sentence(),
          Parent: "Shoes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Boots",
          Description: faker.lorem.sentence(),
          Parent: "Shoes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Slippers",
          Description: faker.lorem.sentence(),
          Parent: "Shoes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Flip Flops",
          Description: faker.lorem.sentence(),
          Parent: "Shoes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Loafers",
          Description: faker.lorem.sentence(),
          Parent: "Shoes",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "T-Shirts",
          Description: faker.lorem.sentence(),
          Parent: "Clothing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Shirts",
          Description: faker.lorem.sentence(),
          Parent: "Clothing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Pants",
          Description: faker.lorem.sentence(),
          Parent: "Clothing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Shorts",
          Description: faker.lorem.sentence(),
          Parent: "Clothing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Sweaters",
          Description: faker.lorem.sentence(),
          Parent: "Clothing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Jackets",
          Description: faker.lorem.sentence(),
          Parent: "Clothing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Bags",
          Description: faker.lorem.sentence(),
          Parent: "Accessories",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Belts",
          Description: faker.lorem.sentence(),
          Parent: "Accessories",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Socks",
          Description: faker.lorem.sentence(),
          Parent: "Accessories",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Gloves",
          Description: faker.lorem.sentence(),
          Parent: "Accessories",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Name: "Scarves",
          Description: faker.lorem.sentence(),
          Parent: "Accessories",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Commands to revert seed
    await queryInterface.bulkDelete("ProductCategories", null, {});
  },
};
