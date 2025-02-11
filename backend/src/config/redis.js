const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URI,
});

redisClient.on('error', (err) => console.error("Redis Error: ", err));

const connectRedis = async () => {
    if (!redisClient.isOpen) { 
        await redisClient.connect();
        console.log("✅ Redis connected successfully");
    } else {
        console.log("ℹ️ Redis already connected");
    }
};

module.exports = {redisClient, connectRedis}