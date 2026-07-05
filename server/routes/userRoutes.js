const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} = require("../controllers/userController");

// Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);

// Change Password
router.put("/change-password", protect, changePassword);
//delete account
router.delete("/delete-account", protect, deleteAccount);
// Freelancer Only
router.get(
  "/freelancer-dashboard",
  protect,
  authorize("freelancer"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Freelancer",
    });
  }
);

// Client Only
router.get(
  "/client-dashboard",
  protect,
  authorize("client"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Client",
    });
  }
);

// Admin Only
router.get(
  "/admin-dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

module.exports = router;