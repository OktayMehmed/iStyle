const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile
} = require("../controllers/User");
const { protect } = require("../middleware/auth");

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile)

module.exports = router;
