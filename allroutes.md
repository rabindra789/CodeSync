## Assessment routes - assessmentRoutes.js
router.get("/", authMiddleware, getAssessments);
router.post("/create", authMiddleware, createAssessment);
router.get("/:id/get", authMiddleware, getAssessment);
router.put("/:id/update", authMiddleware, updateAssessment);
router.delete("/:id/delete", authMiddleware, deleteAssessment);
router.post("/:id/assign", authMiddleware, assignAssessment);
router.get("/:id/candidates", authMiddleware, getAssessmentCandidates);
router.post("/:id/test-cases", authMiddleware, addTestCase);
router.get("/:id/test-cases", authMiddleware, getTestCases);
router.delete("/:id/test-cases/:testCaseId", authMiddleware,  deleteTestCase);

## Auth routes - authRoutes.js
router.post("/", liveblocksAuth)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

## Code routes - codeRoutes.js
router.post("/execute", authMiddleware, executeCode);
router.get("/status/:id", authMiddleware, getExecutionStatus);
router.get("/result/:id", authMiddleware, getExecutionResult);

## Collaboration routes - collaborationRoutes.js
router.post('/create', createRoom);
router.get('/:roomId', getRoom)
router.delete('/:roomId', deleteRoom)

## Submission routes - submissionRoutes.js
router.post("/submit", authMiddleware, submitCode);
router.get("/:id", authMiddleware, getSubmissionById);
router.get("/:id/result", authMiddleware, getSubmissionResult);
router.get("/user/:userId", authMiddleware, getAllSubmissionForUser);

## User routes - userRoutes.js
router.get("/:id/profile", authMiddleware, getUserProfile);
router.put("/:id/update", authMiddleware, updateUserProfile);
router.get("/:id/assessments", authMiddleware, getUserAssessments);
router.get("/:id/submissions", authMiddleware, getUserSubmissions);
router.put("/:id/role", authMiddleware, updateUserRole);


and this is the app.js file
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/test-cases", testCaseRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/collaborations", collaborationRoutes);