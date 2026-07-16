const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  applyForGig,
  getMyProposals,
  getGigProposals,
  acceptProposal,
  rejectProposal,
  withdrawProposal,
} = require("../controllers/proposalController");

// Freelancer
router.post("/", protect, authorize("freelancer"), applyForGig);

router.get(
  "/my",
  protect,
  authorize("freelancer"),
  getMyProposals
);

router.put(
  "/:id/withdraw",
  protect,
  authorize("freelancer"),
  withdrawProposal
);

// Client
router.get(
  "/gig/:gigId",
  protect,
  authorize("client"),
  getGigProposals
);

router.put(
  "/:id/accept",
  protect,
  authorize("client"),
  acceptProposal
);

router.put(
  "/:id/reject",
  protect,
  authorize("client"),
  rejectProposal
);

module.exports = router;