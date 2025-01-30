const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {connectRedis} = require("./config/redis");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
    res.send("CodeSync API is running...");
});
app.use("/api/auth", authRoutes);


module.exports = app;
