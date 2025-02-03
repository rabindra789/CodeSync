import express from "express";
import {
  submitCode,
  getSubmissionById,
  getSubmissionResult,
  getAllSubmissionsForUser,
} from "../controllers/submissionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, submitCode);
router.get("/:id", authMiddleware, getSubmissionById);
router.get("/:id/result", authMiddleware, getSubmissionResult);
router.get("/user/:userId", authMiddleware, getAllSubmissionsForUser);

export default router;
