const redis = require('redis');

const redisClient = redis.createClient({
    url: process.env.REDIS_URI,
});

redisClient.on('error', (err) => console.error("Redis Error: ", err));

const connectRedis = async () => {
    await redisClient.connect();
    console.log("Redis connected successfully");
}

module.exports = {redisClient, connectRedis}