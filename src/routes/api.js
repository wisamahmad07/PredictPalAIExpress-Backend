const express = require("express");

const userProfilesRoute = require("./userProfiles");
const paymentMethodsRoute = require("./paymentMethods");
const videosRoute = require("./videos");
const eCommerceRoute = require("./eCommerce");
const communityRoute = require("./community");

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.use("/user-profiles", userProfilesRoute);
router.use("/payment-methods", paymentMethodsRoute);
router.use("/videos", videosRoute);
router.use("/ecommerce", eCommerceRoute);
router.use("/community", communityRoute);

module.exports = router;
