const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
  deleteGig,
} = require("../controllers/gigController");

// ================= PUBLIC ROUTES =================

// Get All Gigs
router.get("/", getAllGigs);

// Get Single Gig
router.get("/:id", getGigById);

// ================= CLIENT ROUTES =================

// Create Gig
router.post(
  "/",
  protect,
  authorize("client"),
  createGig
);

// Update Gig
router.put(
  "/:id",
  protect,
  authorize("client"),
  updateGig
);

// Delete Gig
router.delete(
  "/:id",
  protect,
  authorize("client"),
  deleteGig
);

module.exports = router;