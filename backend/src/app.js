const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const assessmentRoutes = require("./routes/assessmentRoutes.js");
const submissionRoutes = require("./routes/submissionRoutes.js");
const codeRoutes = require("./routes/codeRoutes.js");
const collaborationRoutes = require("./routes/collaborationRoutes.js");
// const notificationRoutes = require("./routes/notificationRoutes.js");
// const adminRoutes = require("./routes/adminRoutes.js");
// const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assessments", assessmentRoutes);
// app.use("/api/test-cases", testCaseRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/collaborations", collaborationRoutes);
// app.use("/api/notifications", notificationRoutes);
// app.use("/api/admin", adminRoutes);

// app.use(errorHandler);

module.exports = app;
