const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.log("Redis Error:", err.message);
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Redis Connected");
    }
  } catch (error) {
    console.log("Redis Connection Error:", error.message);
  }
};

module.exports = {
  redisClient,
  connectRedis,
};