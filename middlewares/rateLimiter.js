const rateLimit = require("express-rate-limit");

const { RedisStore } = require("rate-limit-redis");

const { redisClient } = require("../config/redis");

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,

  max: 10,

  message: {
    success: false,
    message: "Too many requests",
  },

  standardHeaders: true,

  legacyHeaders: false,

  store: new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
  }),
});

module.exports = apiLimiter;