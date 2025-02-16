const { Op, fn, col, where } = require("sequelize");
const { successResponse, errorResponse } = require("../../helpers");
const {
  Brands,
  Colors,
  ProductCategories,
  ProductReviews,
  Products,
  UserProfiles,
  Orders,
  ProductReviewsUserProfilesLikes,
  ProductReviewsUserProfilesDislikes,
  Sizes,
  sequelize,
} = require("../../models");

exports.getAllProductCategories = async (req, res) => {
  try {
    const { keyword, minify } = req.query;

    // Construct where clause with optional keyword filtering
    const whereClause = keyword ? { Name: { [Op.like]: `%${keyword}%` } } : {};

    // Define attributes based on 'minify' query parameter
    const attributes =
      minify === "true"
        ? ["ProductCatID", "Name"]
        : {
            include: [
              [
                sequelize.fn("COUNT", sequelize.col("Products.ProductID")),
                "ProductCount",
              ],
            ],
          };

    // Fetch categories with necessary joins and grouping
    const categories = await ProductCategories.findAll({
      attributes,
      include: [{ model: Products, attributes: [] }],
      group: ["ProductCategories.ProductCatID"],
      order: [
        [
          minify === "true" ? "Name" : "ProductCount",
          minify === "true" ? "ASC" : "DESC",
        ],
      ],
    });

    return successResponse(req, res, categories);
  } catch (err) {
    console.error(err);
    return errorResponse(
      req,
      res,
      "Error fetching product categories",
      500,
      err
    );
  }
};

exports.getAllProductSizes = async (req, res) => {
  try {
    // Fetch product sizes
    const sizes = await Sizes.findAll();

    return successResponse(req, res, sizes);
  } catch (err) {
    console.error(err);
    return errorResponse(req, res, "Error fetching product sizes", 500, err);
  }
};

exports.getAllProductColors = async (req, res) => {
  try {
    // Fetch product colors
    const colors = await Colors.findAll();

    return successResponse(req, res, colors);
  } catch (err) {
    console.error(err);
    return errorResponse(req, res, "Error fetching product colors", 500, err);
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const {
      keyword = "",
      page = 1,
      length = 5,
      sizes = "",
      colors = "",
      brands = "",
      categories = "",
      priceRange = "",
    } = req.query;

    // Calculate pagination variables
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(length, 10) || 10;
    const offset = (pageNumber - 1) * pageSize;

    // Construct where clause with optional keyword filtering
    const whereClause = keyword ? { Name: { [Op.like]: `%${keyword}%` } } : {};

    // Parse filter parameters into arrays
    const sizeFilter = sizes ? sizes.split(",") : [];
    const colorFilter = colors ? colors.split(",") : [];
    const brandFilter = brands ? brands.split(",") : [];
    const categoryFilter = categories ? categories.split(",") : [];

    // Parse priceRange into min and max values
    let minPrice, maxPrice;
    if (priceRange) {
      [minPrice, maxPrice] = priceRange.split(",").map(Number);
      whereClause.Price = {};
      if (!isNaN(minPrice)) whereClause.Price[Op.gte] = minPrice; // Greater than or equal to minPrice
      if (!isNaN(maxPrice)) whereClause.Price[Op.lte] = maxPrice; // Less than or equal to maxPrice
    }

    const includeArray = [
      {
        model: Brands,
        where: brandFilter.length ? { BrandID: { [Op.in]: brandFilter } } : {},
      },
      {
        model: ProductCategories,
        where: categoryFilter.length
          ? { ProductCatID: { [Op.in]: categoryFilter } }
          : {},
      },
      {
        model: Colors,
        through: {
          attributes: [],
        },
        where: colorFilter.length ? { ColorID: { [Op.in]: colorFilter } } : {},
      },
      {
        model: Sizes,
        through: {
          attributes: [],
        },
        where: sizeFilter.length ? { SizeID: { [Op.in]: sizeFilter } } : {},
      },
      {
        model: ProductReviews,
      },
    ];

    // Fetch products with pagination, filters, and review aggregates
    const products = await Products.findAndCountAll({
      where: whereClause,
      include: includeArray,
      limit: pageSize,
      offset: offset,
    });

    return successResponse(req, res, products);
  } catch (err) {
    console.error(err);
    return errorResponse(req, res, "Error fetching products", 500, err);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the product by ID including related models
    const product = await Products.findOne({
      where: { ProductID: id },
      include: [
        {
          model: Brands,
        },
        {
          model: ProductCategories,
        },
        {
          model: Colors,
          through: {
            attributes: [],
          },
        },
        {
          model: Sizes,
          through: {
            attributes: [],
          },
        },
        {
          model: ProductReviews,
          include: [
            {
              model: UserProfiles,
              as: "Author",
              attributes: ["User_ID", "Name", "Avatar"],
            },
            {
              model: UserProfiles,
              as: "LikedUsers",
              through: {
                model: ProductReviewsUserProfilesLikes,
                attributes: [],
              },
              attributes: ["User_ID"],
            },
            {
              model: UserProfiles,
              as: "DislikedUsers",
              through: {
                model: ProductReviewsUserProfilesDislikes,
                attributes: [],
              },
              attributes: ["User_ID"],
            },
          ],
        },
      ],
    });

    // Check if product exists
    if (!product) {
      return errorResponse(req, res, "Product not found", 404);
    }

    return successResponse(req, res, product);
  } catch (err) {
    console.error(err);
    return errorResponse(req, res, "Error fetching product by ID", 500, err);
  }
};

exports.getPopularProduct = async (req, res) => {
  try {
    const { num = 1 } = req.query;
    // Fetch products with their associated reviews
    const products = await Products.findAll({
      include: [
        {
          model: Brands,
        },
        {
          model: ProductCategories,
        },
        {
          model: Colors,
          through: {
            attributes: [],
          },
        },
        {
          model: Sizes,
          through: {
            attributes: [],
          },
        },
        {
          model: ProductReviews,
          attributes: ["Rating"],
        },
      ],
    });

    // Calculate popularity based on average rating or number of reviews
    const popularProducts = products.map((product) => {
      const totalReviews = product.ProductReviews.length;
      const averageRating =
        product.ProductReviews.reduce((acc, review) => acc + review.Rating, 0) /
          totalReviews || 0;

      return {
        ...product.toJSON(),
        totalReviews,
        averageRating,
      };
    });

    // Sort products by average rating or total reviews
    popularProducts.sort(
      (a, b) =>
        b.averageRating - a.averageRating || b.totalReviews - a.totalReviews
    );

    // Limit the result set if needed, e.g., top products
    const topProducts = popularProducts.slice(0, num);

    return successResponse(req, res, topProducts);
  } catch (error) {
    console.error(error);
    return errorResponse(
      req,
      res,
      "Error fetching popular products.",
      500,
      err
    );
  }
};

exports.createProductReview = async (req, res) => {
  try {
    const { ProductID, User_ID, Title, Notes, Rating } = req.body;

    // Check if ProductID and User_ID are provided
    if (!ProductID || !User_ID) {
      return errorResponse(
        req,
        res,
        "Product ID and User ID are required.",
        400
      );
    }

    // Optionally, validate other fields like Title, Notes, and Rating
    if (!Title || !Notes || !Rating) {
      return errorResponse(
        req,
        res,
        "Title, Notes, and Rating are required.",
        400
      );
    }

    // Create a new product review
    const newReview = await ProductReviews.create(req.body);

    if (!newReview) {
      return errorResponse(req, res, "Failed to create a new review.", 500);
    }

    // Retrieve all reviews for the product with associated user data
    const productReviews = await ProductReviews.findAll({
      where: { ProductID },
      include: [
        {
          model: UserProfiles,
          as: "Author",
          attributes: ["User_ID", "Name", "Avatar"],
        },
        {
          model: UserProfiles,
          as: "LikedUsers",
          through: {
            model: ProductReviewsUserProfilesLikes,
            attributes: [],
          },
          attributes: ["User_ID"],
        },
        {
          model: UserProfiles,
          as: "DislikedUsers",
          through: {
            model: ProductReviewsUserProfilesDislikes,
            attributes: [],
          },
          attributes: ["User_ID"],
        },
      ],
    });

    // Return a success response with the created product review
    return successResponse(req, res, productReviews);
  } catch (error) {
    console.error("Error creating product review:", error);
    return errorResponse(
      req,
      res,
      "Error creating product review.",
      500,
      error
    );
  }
};

exports.changeProductReviewReaction = async (req, res) => {
  try {
    const { ReviewID, User_ID, Type } = req.body;

    // Check if ReviewID and User_ID are provided
    if (!ReviewID || !User_ID) {
      return errorResponse(
        req,
        res,
        "Review ID and User ID are required.",
        400
      );
    }

    if (Type === "like") {
      // Remove any existing dislike by this user for the product review
      await ProductReviewsUserProfilesDislikes.destroy({
        where: { ReviewID, User_ID },
      });

      // Create a new like entry for the product review by this user
      await ProductReviewsUserProfilesLikes.create({
        ReviewID,
        User_ID,
      });
    } else if (Type === "dislike") {
      // Remove any existing like by this user for the product review
      await ProductReviewsUserProfilesLikes.destroy({
        where: { ReviewID, User_ID },
      });

      // Create a new dislike entry for the product review by this user
      await ProductReviewsUserProfilesDislikes.create({
        ReviewID,
        User_ID,
      });
    } else {
      return errorResponse(req, res, "Invalid reaction type.", 400);
    }

    const productReview = await ProductReviews.findOne({
      where: { ReviewID },
      include: [
        {
          model: UserProfiles,
          as: "Author",
          attributes: ["User_ID", "Name", "Avatar"],
        },
        {
          model: UserProfiles,
          as: "LikedUsers",
          through: {
            model: ProductReviewsUserProfilesLikes,
            attributes: [],
          },
          attributes: ["User_ID"],
        },
        {
          model: UserProfiles,
          as: "DislikedUsers",
          through: {
            model: ProductReviewsUserProfilesDislikes,
            attributes: [],
          },
          attributes: ["User_ID"],
        },
      ],
    });

    return successResponse(req, res, productReview);
  } catch (error) {
    console.error(error);
    return errorResponse(
      req,
      res,
      "Error creating product review.",
      500,
      error
    );
  }
};

exports.getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return errorResponse(req, res, "User ID is required.", 500);
    }

    const orders = await Orders.findAll({
      where: {
        CustomerID: userId,
      },
      attributes: [
        "OrderID",
        "CustomerID",
        "Name",
        "Description",
        "Amount",
        "Currency",
        "Items",
        "Shipping",
        "Taxes",
        "Status",
        "ShippingAddress",
        "BillingAddress",
      ],
      order: [["createdAt", "DESC"]],
    });

    if (orders.length === 0) {
      return errorResponse(req, res, "No orders found for this user.", 404);
    }

    return successResponse(req, res, orders);
  } catch (error) {
    console.error(error);
    return errorResponse(
      req,
      res,
      "Error getting all user orders.",
      500,
      error
    );
  }
};

exports.createOrder = async (req, res) => {
  try {
    const {
      CustomerID,
      Name,
      Description,
      Amount,
      Currency,
      Items,
      Shipping,
      Taxes,
      Status,
      ShippingAddress,
      BillingAddress,
    } = req.body;

    // Validate required fields
    if (
      !CustomerID ||
      !Name ||
      !Description ||
      !ShippingAddress ||
      !BillingAddress
    ) {
      return errorResponse(req, res, "Missing required fields.", 400);
    }

    const newOrder = await Orders.create({
      CustomerID,
      Name,
      Description,
      Amount,
      Currency,
      Items,
      Shipping,
      Taxes,
      Status,
      ShippingAddress,
      BillingAddress,
    });

    return successResponse(req, res, newOrder, 201);
  } catch (error) {
    console.error("Error creating order:", error);
    return errorResponse(req, res, "Error creating order.", 500, error);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Name,
      Description,
      Amount,
      Currency,
      Items,
      Shipping,
      Taxes,
      Status,
      ShippingAddress,
      BillingAddress,
    } = req.body;

    // Check if the order exists
    const order = await Orders.findByPk(id);
    if (!order) {
      return errorResponse(req, res, "Order not found.", 404, error);
    }

    // Update the order with new data
    const updatedOrder = await order.update({
      Name,
      Description,
      Amount,
      Currency,
      Items,
      Shipping,
      Taxes,
      Status,
      ShippingAddress,
      BillingAddress,
    });

    return successResponse(req, res, updatedOrder, 201);
  } catch (error) {
    console.error("Error updating order:", error);
    return errorResponse(req, res, "Error updating order.", 500, error);
  }
};
