const http = require("http");
const app = require("./app");
const {connectRedis} = require("./config/redis");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();
connectRedis();

// Start server
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
