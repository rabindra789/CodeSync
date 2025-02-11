const express = require("express");
const { executeCode, getExecutionStatus, getExecutionResult } = require("../controllers/codeController");
const {authMiddleware} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/execute", authMiddleware, executeCode);
router.get("/status/:executionId", authMiddleware, getExecutionStatus);
router.get("/result/:executionId", authMiddleware, getExecutionResult);

module.exports = router;