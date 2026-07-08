const Gig = require("../models/Gig");

// ================= CREATE GIG =================
const createGig = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      budget,
      skills,
      deadline,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !budget ||
      !deadline
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Create Gig
    const gig = await Gig.create({
      title,
      description,
      category,
      budget,
      skills,
      deadline,
      client: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Gig created successfully.",
      gig,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GET ALL GIGS =================
const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find()
      .populate("client", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: gigs.length,
      gigs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= GET SINGLE GIG =================
const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate("client", "name email");

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found.",
      });
    }

    res.status(200).json({
      success: true,
      gig,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ================= UPDATE GIG =================
const updateGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        success: false,
        message: "Gig not found.",
      });
    }

    // Only the client who created the gig can update it
    if (gig.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this gig.",
      });
    }

    const updatedGig = await Gig.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        budget: req.body.budget,
        skills: req.body.skills,
        deadline: req.body.deadline,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Gig updated successfully.",
      gig: updatedGig,
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
  createGig,
  getAllGigs,
  getGigById,
  updateGig,
};