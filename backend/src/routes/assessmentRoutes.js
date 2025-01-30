const express = require("express");
const { getAssessments, getAssessment, createAssessment, updateAssessment, deleteAssessment, assignAssessment, getAssessmentCandidates } = require("../controllers/assessmentController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAssessments);
router.post("/", authMiddleware, createAssessment);
router.get("/:id", authMiddleware, getAssessment);
router.put("/:id", authMiddleware, updateAssessment);
router.delete("/:id", authMiddleware, deleteAssessment);


router.post("/:id/assign", authMiddleware, assignAssessment);
router.get("/:id/candidates", authMiddleware, getAssessmentCandidates);

// Test cases management
router.post("/:id/test-cases", authMiddleware, adminMiddleware, addTestCase);
router.get("/:id/test-cases", authMiddleware, getTestCases);
router.delete("/:id/test-cases/:testCaseId", authMiddleware, adminMiddleware, deleteTestCase);

module.exports = router;