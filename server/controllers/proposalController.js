const Proposal = require("../models/Proposal");
const Gig = require("../models/Gig");
const Notification = require("../models/Notification");

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
    await Notification.create({
  recipient: gig.client,
  sender: req.user.id,
  type: "proposal",
  title: "New Proposal",
  message: "A freelancer has submitted a proposal for your gig.",
  referenceId: proposal._id,
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

// ================= MY PROPOSALS =================
const getMyProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({
      freelancer: req.user.id,
    })
      .populate("gig")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: proposals.length,
      proposals,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GIG PROPOSALS =================
const getGigProposals = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.gigId);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found.",
      });
    }

    if (gig.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied.",
      });
    }

    const proposals = await Proposal.find({
      gig: req.params.gigId,
    }).populate("freelancer", "name email");

    res.status(200).json({
      success: true,
      count: proposals.length,
      proposals,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= ACCEPT PROPOSAL =================
const acceptProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id).populate("gig");

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found.",
      });
    }

    if (proposal.gig.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied.",
      });
    }

    proposal.status = "accepted";
    await proposal.save();

    await Notification.create({
  recipient: proposal.freelancer,
  sender: req.user.id,
  type: "proposal",
  title: "Proposal Accepted",
  message: "Congratulations! Your proposal has been accepted.",
  referenceId: proposal._id,
});

    res.status(200).json({
      success: true,
      message: "Proposal accepted successfully.",
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

// ================= REJECT PROPOSAL =================
const rejectProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id).populate("gig");

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found.",
      });
    }

    if (proposal.gig.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied.",
      });
    }

    proposal.status = "rejected";
    await proposal.save();
    await Notification.create({
  recipient: proposal.freelancer,
  sender: req.user.id,
  type: "proposal",
  title: "Proposal Rejected",
  message: "Your proposal has been rejected.",
  referenceId: proposal._id,
});

    res.status(200).json({
      success: true,
      message: "Proposal rejected successfully.",
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

// ================= WITHDRAW PROPOSAL =================
const withdrawProposal = async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found.",
      });
    }

    if (proposal.freelancer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Access Denied.",
      });
    }

    proposal.status = "withdrawn";
    await proposal.save();

    res.status(200).json({
      success: true,
      message: "Proposal withdrawn successfully.",
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
  getMyProposals,
  getGigProposals,
  acceptProposal,
  rejectProposal,
  withdrawProposal,
};