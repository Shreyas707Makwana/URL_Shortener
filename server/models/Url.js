const mongoose = require('mongoose');

// Define the URL schema
const urlSchema = new mongoose.Schema({
  // Original URL submitted by the user
  originalUrl: {
    type: String,
    required: true,
  },
  // Short URL code (will be generated)
  urlCode: {
    type: String,
    required: true,
    unique: true,
  },
  // Date when the URL was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Optional: count how many times the short URL has been accessed
  clicks: {
    type: Number,
    default: 0,
  }
});

// Create and export the URL model
module.exports = mongoose.model('Url', urlSchema);