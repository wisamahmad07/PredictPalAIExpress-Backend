"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed data for Colors using the provided color sets
    const colors = [
      {
        Color: "Dark Gray",
        Value: ["#3A3A3A", "#EDEDED"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Bright Yellow",
        Value: ["#FDCA41"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Bright Blue",
        Value: ["#2662F0"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Green",
        Value: ["#2D773E"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Red",
        Value: ["#ED0323"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Purple",
        Value: ["#6665DD"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Purple & Pink",
        Value: ["#6665DD", "#DE1092"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Lime Green",
        Value: ["#7ED320"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Orange",
        Value: ["#F17105"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Orange & Yellow",
        Value: ["#F17105", "#FDCA41"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Olive Green",
        Value: ["#6F8738"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Blue & Light Blue",
        Value: ["#2662F0", "#BDE0F6"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Olive Green & Light Blue",
        Value: ["#6F8738", "#BDE0F6"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Red & Gray",
        Value: ["#ED0323", "#EDEDED"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Dark Gray & Red",
        Value: ["#3A3A3A", "#ED0323"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Teal",
        Value: ["#4BD1BF"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Coral",
        Value: ["#F6725B"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Color: "Red & Coral",
        Value: ["#ED0323", "#F6725B"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert seed data
    await queryInterface.bulkInsert("Colors", colors, {});
  },

  async down(queryInterface, Sequelize) {
    // Remove all entries from Colors
    await queryInterface.bulkDelete("Colors", null, {});
  },
};
