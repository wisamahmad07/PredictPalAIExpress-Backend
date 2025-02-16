"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed data for Sizes using the provided size chart
    const sizes = [
      {
        Name: "XS",
        ShortCode: "XS",
        Description: "Extra Small",
        Chest: [34, 36],
        Waist: [28, 30],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "S",
        ShortCode: "S",
        Description: "Small",
        Chest: [36, 38],
        Waist: [30, 32],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "M",
        ShortCode: "M",
        Description: "Medium",
        Chest: [38, 40],
        Waist: [32, 34],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "L",
        ShortCode: "L",
        Description: "Large",
        Chest: [40, 42],
        Waist: [34, 36],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "XL",
        ShortCode: "XL",
        Description: "Extra Large",
        Chest: [42, 44],
        Waist: [36, 38],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "XXL",
        ShortCode: "XXL",
        Description: "Double Extra Large",
        Chest: [44, 46],
        Waist: [38, 40],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "3XL",
        ShortCode: "3XL",
        Description: "Triple Extra Large",
        Chest: [46, 48],
        Waist: [44, 46],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "4XL",
        ShortCode: "4XL",
        Description: "Quadruple Extra Large",
        Chest: [48, 50],
        Waist: [44, 46],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "5XL",
        ShortCode: "5XL",
        Description: "Quintuple Extra Large",
        Chest: [48, 50],
        Waist: [44, 46],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert seed data
    await queryInterface.bulkInsert("Sizes", sizes, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all entries from Sizes
    await queryInterface.bulkDelete("Sizes", null, {});
  },
};
