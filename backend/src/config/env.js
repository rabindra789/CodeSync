const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    REDIS_URI: process.env.REDIS_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    JUDGE0_API_KEY: process.env.JUDGE0_API_KEY,
    JUDGE0_API_URL: process.env.JUDGE0_API_URL,
    LIVEBLOCKS_SECRET_KEY: process.env.LIVEBLOCKS_SECRET_KEY
}