const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = require("../controllers/notificationController");

// Get all notifications
router.get("/", protect, getNotifications);

// Mark all as read
router.put("/read-all", protect, markAllAsRead);

// Mark one as read
router.put("/:id/read", protect, markAsRead);

// Delete notification
router.delete("/:id", protect, deleteNotification);

module.exports = router;