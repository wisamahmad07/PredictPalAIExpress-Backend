const { Op, fn, col, where } = require("sequelize");
const { successResponse, errorResponse } = require("../../helpers");
const {
  UserProfiles,
  SocialFeeds,
  SocialReviews,
  sequelize,
} = require("../../models");

exports.getAllFeeds = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const totalFeeds = await SocialFeeds.count();

    const feeds = await SocialFeeds.findAll({
      include: [
        {
          model: UserProfiles,
          attributes: ["Avatar", "Name"],
        },
        {
          model: SocialReviews,
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset: offset,
    });

    return successResponse(req, res, { feeds, totalFeeds }, 200);
  } catch (err) {
    console.error(err);
    return errorResponse(req, res, "Error creating social feed", 500, err);
  }
};

exports.createSocialFeed = async (req, res) => {
  try {
    const { Content, Type, Images, Article, User_ID } = req.body;

    if (!Content || !User_ID) {
      return errorResponse(req, res, "Content and User_ID are required", 400);
    }

    const newFeed = await SocialFeeds.create({
      Content,
      Type: Type || "Normal",
      Images: Images || [],
      Article,
      User_ID,
    });

    const fullFeed = await SocialFeeds.findOne({
      where: { SocialFeedID: newFeed.SocialFeedID },
      include: [
        {
          model: UserProfiles,
          attributes: ["Avatar", "Name"],
        },
        {
          model: SocialReviews,
          include: [
            {
              model: UserProfiles,
              attributes: ["Avatar", "Name"],
            },
          ],
        },
      ],
    });

    return successResponse(req, res, fullFeed, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(req, res, "Error creating social feed", 500, err);
  }
};

exports.createSocialReview = async (req, res) => {
  try {
    const { Content, SocialFeedID, User_ID } = req.body;

    if (!Content || !SocialFeedID || !User_ID) {
      return errorResponse(
        req,
        res,
        "Content, SocialFeedID, and User_ID are required",
        400
      );
    }

    const newReview = await SocialReviews.create({
      Content,
      SocialFeedID,
      User_ID,
    });

    const feed = await SocialFeeds.findOne({
      where: { SocialFeedID: SocialFeedID },
      include: [
        {
          model: UserProfiles,
          attributes: ["Avatar", "Name"],
        },
        {
          model: SocialReviews,
          include: [
            {
              model: UserProfiles,
              attributes: ["Avatar", "Name"],
            },
          ],
        },
      ],
    });

    return successResponse(req, res, feed, 201);
  } catch (err) {
    console.error(err);
    return errorResponse(req, res, "Error creating social review", 500, err);
  }
};

exports.likeSocialFeed = async (req, res) => {
  try {
    const { id } = req.params;

    const feed = await SocialFeeds.findOne({
      where: { SocialFeedID: id },
      include: [
        {
          model: UserProfiles,
          attributes: ["Avatar", "Name"],
        },
        {
          model: SocialReviews,
          include: [
            {
              model: UserProfiles,
              attributes: ["Avatar", "Name"],
            },
          ],
        },
      ],
    });

    if (!feed) {
      return errorResponse(req, res, "Social feed not found", 404);
    }

    feed.Likes += 1;
    await feed.save();

    return successResponse(req, res, feed);
  } catch (err) {
    console.error(err);
    return errorResponse(req, res, "Error liking social feed", 500, err);
  }
};
