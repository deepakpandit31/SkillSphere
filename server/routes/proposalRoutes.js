const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  applyForGig,
} = require("../controllers/proposalController");

// Freelancer applies for a gig
router.post(
  "/",
  protect,
  authorize("freelancer"),
  applyForGig
);

module.exports = router;