const express = require("express");
const { getAssessments, getAssessment, createAssessment, updateAssessment, deleteAssessment, assignAssessment, getAssessmentCandidates, addTestCase, getTestCases, deleteTestCase } = require("../controllers/assessmentController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", authMiddleware, getAssessments);
router.post("/create", authMiddleware, createAssessment);
router.get("/:assessmentId/get", authMiddleware, getAssessment);
router.put("/:assessmentId/update", authMiddleware, updateAssessment);
router.delete("/:assessmentId/delete", authMiddleware, deleteAssessment);


router.post("/:assessmentId/assign", authMiddleware, assignAssessment);
router.get("/:assessmentId/candidates", authMiddleware, getAssessmentCandidates);

// Test cases management
router.post("/:assessmentId/test-cases", authMiddleware, addTestCase);
router.get("/:assessmentId/test-cases", authMiddleware, getTestCases);
router.delete("/:assessmentId/test-cases/:testCaseId", authMiddleware,  deleteTestCase);

module.exports = router;