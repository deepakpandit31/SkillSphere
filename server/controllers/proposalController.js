const Proposal = require("../models/Proposal");
const Gig = require("../models/Gig");

// ================= APPLY FOR GIG =================
const applyForGig = async (req, res) => {
  try {
    const { gigId, coverLetter, bidAmount, estimatedDays } = req.body;

    if (!gigId || !coverLetter || !bidAmount || !estimatedDays) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const gig = await Gig.findById(gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found.",
      });
    }

    // Prevent duplicate application
    const alreadyApplied = await Proposal.findOne({
      gig: gigId,
      freelancer: req.user.id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this gig.",
      });
    }

    const proposal = await Proposal.create({
      gig: gigId,
      freelancer: req.user.id,
      coverLetter,
      bidAmount,
      estimatedDays,
    });

    res.status(201).json({
      success: true,
      message: "Proposal submitted successfully.",
      proposal,
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
  applyForGig,
};