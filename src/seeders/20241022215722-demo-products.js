"use strict";
const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [brands, productCats, sizes, colors] = await Promise.all([
      queryInterface.rawSelect("Brands", { plain: false }, ["BrandID"]),
      queryInterface.rawSelect("ProductCategories", { plain: false }, [
        "ProductCatID",
      ]),
      queryInterface.rawSelect("Sizes", { plain: false }, ["SizeID"]),
      queryInterface.rawSelect("Colors", { plain: false }, ["ColorID"]),
    ]);

    const brandIDs = brands.map((v) => v.BrandID);
    const productCatIDs = productCats.map((v) => v.ProductCatID);
    const sizeIDs = sizes.map((v) => v.SizeID);
    const colorIDs = colors.map((v) => v.ColorID);

    for (let i = 1; i < 101; i++) {
      const selectedColors = faker.helpers.arrayElements(colorIDs, {
        min: 2,
        max: 5,
      });
      const selectedSizes = faker.helpers.arrayElements(sizeIDs, {
        min: 2,
        max: 3,
      });
      let variables = [];
      for (let size of selectedSizes) {
        for (let color of selectedColors) {
          variables.push({
            color,
            size,
            quantity: faker.number.int({ min: 0, max: 30 }),
          });
        }
      }

      let product = {
        Name: faker.commerce.productName(),
        ShortDesc: faker.commerce.productDescription(),
        Description: faker.lorem.paragraphs(3),
        BrandID: faker.helpers.arrayElement(brandIDs),
        ProductCatID: faker.helpers.arrayElement(productCatIDs),
        Images: [faker.image.url(), faker.image.url(), faker.image.url()],
        Price: faker.commerce.price(),
        Stock: variables,
        ReturnPolicy: faker.helpers.arrayElement([7, 15, 30, 60]),
        Material: faker.commerce.productMaterial(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await queryInterface.insert(null, "Products", product, {});
      await queryInterface.bulkInsert(
        "ProductsColors",
        selectedColors.map((item) => ({
          ProductID: i,
          ColorID: item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        {}
      );
      await queryInterface.bulkInsert(
        "ProductsSizes",
        selectedSizes.map((item) => ({
          ProductID: i,
          SizeID: item,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        {}
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
