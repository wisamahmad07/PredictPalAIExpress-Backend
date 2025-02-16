const { Op } = require("sequelize");
const { successResponse, errorResponse } = require("../../helpers");
const { UserProfiles } = require("../../models");
const {
  createUserProfileSchema,
  updateUserProfileSchema,
} = require("./userProfiles.validator");

// Create a new UserProfile
exports.createUserProfile = async (req, res) => {
  try {
    const { error } = createUserProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { User_ID, Email } = req.body;

    const existingProfile = await UserProfiles.findOne({
      where: {
        [Op.or]: [{ User_ID }, { Email }],
      },
    });

    if (existingProfile) {
      console.log("User profile already exists");
      return successResponse(req, res, existingProfile, 200);
    }

    const userProfile = await UserProfiles.create(req.body);
    return successResponse(req, res, userProfile, 201);
  } catch (err) {
    return errorResponse(req, res, "Error creating user profile", 500, err);
  }
};

// Get all UserProfiles
exports.getAllUserProfiles = async (req, res) => {
  try {
    const { keyword = "", page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const condition = keyword
      ? {
          [Op.or]: [{ Name: { [Op.like]: `%${keyword}%` } }],
        }
      : null;

    const userProfiles = await UserProfiles.findAndCountAll({
      where: condition,
      limit: limit,
      offset: offset,
      distinct: true,
      order: [["Name", "ASC"]],
    });

    return successResponse(
      req,
      res,
      {
        totalItems: userProfiles.count,
        data: userProfiles.rows,
        totalPages: Math.ceil(userProfiles.count / limit),
        currentPage: page ? +page : 1,
      },
      200
    );
  } catch (err) {
    return errorResponse(req, res, "Error fetching user profiles", 500, err);
  }
};

// Get a UserProfile by UID
exports.getUserProfileByUid = async (req, res) => {
  try {
    const userProfile = await UserProfiles.findByPk(req.params.uid);
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }
    return successResponse(req, res, userProfile, 200);
  } catch (err) {
    return errorResponse(req, res, "Error fetching user profile", 500, err);
  }
};

// Update a UserProfile
exports.updateUserProfile = async (req, res) => {
  try {
    const { error } = updateUserProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const userProfile = await UserProfiles.findByPk(req.params.uid);
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    await userProfile.update(req.body);
    return successResponse(req, res, userProfile, 200);
  } catch (err) {
    return errorResponse(req, res, "Error updating user profile", 500, err);
  }
};

// Delete a UserProfile
exports.deleteUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfiles.findByPk(req.params.uid);
    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found" });
    }

    await userProfile.destroy();
    return successResponse(req, res, "User profile deleted successfully", 200);
  } catch (err) {
    return errorResponse(req, res, "Error deleting user profile", 500, err);
  }
};
