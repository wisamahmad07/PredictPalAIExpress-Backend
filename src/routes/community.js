const express = require("express");
const communityController = require("../controllers/community/community.controller");

const router = express.Router();

// Get all product categories
router.get("/feeds", communityController.getAllFeeds);
router.post("/create-feed", communityController.createSocialFeed);
router.post("/add-comment", communityController.createSocialReview);
router.post("/like-feed/:id", communityController.likeSocialFeed);

module.exports = router;
