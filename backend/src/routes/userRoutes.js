const express = require("express");
const {getUserProfile, updateuserProfile, getUserAssessments, getuserSubmissions, updateUserRole} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", authMiddleware, getUserProfile);
router.put("/:id", authMiddleware, updateuserProfile);
router.get("/:id/assessments", authMiddleware, getUserAssessments);
router.get("/:id/submissions", authMiddleware, getuserSubmissions);
router.put("/:id/role", authMiddleware, updateUserRole);

module.exports = router;