const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const db = require("./dbs/database.connect.js");
const connectCloudinary = require("./config/cloudinary.config.js");
const mainRoute = require("./routers/main.router.js");
const app = express();
// connect Cloudinary
connectCloudinary();
app.use(express.json());
app.use(cors());
app.use(mainRoute);

// default error handler middleware
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack,
    message: error.message || "Internal Server Error",
  });
});
module.exports = app;
