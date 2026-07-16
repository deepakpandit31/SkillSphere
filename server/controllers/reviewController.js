const Review = require("../models/Review");
const Gig = require("../models/Gig");

// ================= ADD REVIEW =================
const addReview = async (req, res) => {
  try {
    const { gigId, freelancerId, rating, comment } = req.body;

    if (!gigId || !freelancerId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check if gig exists
    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found.",
      });
    }

    // Only gig owner can review
    if (gig.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied.",
      });
    }

    // Prevent duplicate review
    const alreadyReviewed = await Review.findOne({
      gig: gigId,
      client: req.user.id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this freelancer.",
      });
    }

    const review = await Review.create({
      client: req.user.id,
      freelancer: freelancerId,
      gig: gigId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully.",
      review,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GET REVIEWS =================
const getFreelancerReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      freelancer: req.params.freelancerId,
    })
      .populate("client", "name")
      .populate("gig", "title");

    const totalReviews = reviews.length;

    const averageRating =
      totalReviews === 0
        ? 0
        : (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
          ).toFixed(1);

    res.status(200).json({
      success: true,
      totalReviews,
      averageRating,
      reviews,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= UPDATE REVIEW =================
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    if (review.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied.",
      });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    await review.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      review,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= DELETE REVIEW =================
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found.",
      });
    }

    if (review.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied.",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addReview,
  getFreelancerReviews,
  updateReview,
  deleteReview,
};