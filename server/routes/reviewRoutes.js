const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  addReview,
  getFreelancerReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

// Public
router.get("/:freelancerId", getFreelancerReviews);

// Client
router.post(
  "/",
  protect,
  authorize("client"),
  addReview
);

router.put(
  "/:id",
  protect,
  authorize("client"),
  updateReview
);

router.delete(
  "/:id",
  protect,
  authorize("client"),
  deleteReview
);

module.exports = router;