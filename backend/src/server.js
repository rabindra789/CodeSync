const http = require("http");
const app = require("./app");
const { connectRedis } = require("./config/redis");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Start server
const server = http.createServer(app);
const startServer = async () => {
    try {
        await connectDB();
        await connectRedis();
        server.listen(5000, () =>
            console.log("🚀 Server running on port 5000")
        );
    } catch (err) {
        console.error("❌ Error starting server:", err);
    }
};

startServer();
