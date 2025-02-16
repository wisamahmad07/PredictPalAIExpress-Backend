const express = require("express");
const eCommerceController = require("../controllers/eCommerce/eCommerce.controller");

const router = express.Router();

// Get all product categories
router.get("/product-categories", eCommerceController.getAllProductCategories);
router.get("/product-sizes", eCommerceController.getAllProductSizes);
router.get("/product-colors", eCommerceController.getAllProductColors);
router.get("/products", eCommerceController.getAllProducts);
router.get("/products/popular", eCommerceController.getPopularProduct);
router.get("/products/:id", eCommerceController.getProductById);
router.post("/products/review", eCommerceController.createProductReview);
router.post(
  "/products/review/reaction",
  eCommerceController.changeProductReviewReaction
);
router.get("/orders", eCommerceController.getAllOrdersByUser);
router.post("/orders/create", eCommerceController.createOrder);
router.post("/orders/update/:id", eCommerceController.updateOrder);

module.exports = router;
