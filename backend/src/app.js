import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";
import collaborationRoutes from "./routes/collaborationRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/collaborations", collaborationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app;
