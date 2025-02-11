const express = require("express");
const {
    submitCode,
    getSubmissionById,
    getSubmissionResult,
    getAllSubmissionForUser,
} = require("../controllers/submissionController.js");
const { authMiddleware } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/submit", authMiddleware, submitCode);
router.get("/:submissionId", authMiddleware, getSubmissionById);
router.get("/:submissionId/result", authMiddleware, getSubmissionResult);
router.get("/user/:userId", authMiddleware, getAllSubmissionForUser);

module.exports = router;
