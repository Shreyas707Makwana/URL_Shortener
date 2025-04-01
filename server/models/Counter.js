const mongoose = require('mongoose');

// Define the counter schema for generating sequential IDs
const counterSchema = new mongoose.Schema({
  // Name of the counter (we'll use 'url_count')
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Current sequence value
  value: {
    type: Number,
    default: 0,
  },
});

// Create and export the Counter model
module.exports = mongoose.model('Counter', counterSchema);