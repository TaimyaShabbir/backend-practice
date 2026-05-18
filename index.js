require("dotenv").config();

const express = require("express");

const connectDB = require("./config/db");

const { connectRedis } = require("./config/redis");

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    await connectDB();


    await connectRedis();

    const apiLimiter = require("./middlewares/rateLimiter");

    app.use(apiLimiter);

    app.use("/auth", require("./routes/authRoutes"));

    app.use("/user", require("./routes/userRoutes"));

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {

    console.log("Server Error:", error.message);
  }
};

startServer();