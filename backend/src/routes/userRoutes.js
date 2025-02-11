const express = require("express");
const {getUserProfile, updateUserProfile, getUserAssessments, getUserSubmissions, updateUserRole} = require("../controllers/userController.js");
const {authMiddleware} = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/:userId", authMiddleware, getUserProfile);
router.put("/:userId/update", authMiddleware, updateUserProfile);
router.get("/:userId/assessments", authMiddleware, getUserAssessments);
router.get("/:userId/submissions", authMiddleware, getUserSubmissions);
router.put("/:userId/role", authMiddleware, updateUserRole);

module.exports = router;
