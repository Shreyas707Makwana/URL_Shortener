// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import routes
const urlRoutes = require("./routes/url");
const redirectRoutes = require("./routes/redirect");

// Use routes
app.use("/api/url", urlRoutes);
app.use("/", redirectRoutes);

// Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  const buildPath = path.join(__dirname, "../client/build");
  app.use(express.static(buildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// Basic API health check route
app.get("/api/health", (req, res) => {
  res.send("URL Shortener API is running");
});

// Export the app instead of starting the server with app.listen()
// This is required for Vercel's serverless functions
module.exports = app;
