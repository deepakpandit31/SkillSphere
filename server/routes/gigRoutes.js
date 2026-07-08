const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
} = require("../controllers/gigController");

// ================= PUBLIC ROUTES =================

// Get All Gigs
router.get("/", getAllGigs);

// Get Single Gig
router.get("/:id", getGigById);

// ================= CLIENT ROUTES =================

// Create Gig (Only Client)
router.post(
  "/create",
  protect,
  authorize("client"),
  createGig
);

// Update Gig (Only Owner Client)
router.put(
  "/:id",
  protect,
  authorize("client"),
  updateGig
);

module.exports = router;