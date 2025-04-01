const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const Url = require('../models/Url');
const Counter = require('../models/Counter');
const { encode } = require('../utils/base62');

// Route to create a new shortened URL
router.post('/shorten', async (req, res) => {
  // Get the original URL from the request body
  const { originalUrl } = req.body;
  const baseUrl = process.env.BASE_URL;
  
  // Check if the base URL is valid
  if (!validUrl.isUri(baseUrl)) {
    return res.status(400).json({ error: 'Invalid base URL' });
  }
  
  // Check if the original URL is valid
  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }
  
  try {
    // Check if the URL already exists in the database
    let url = await Url.findOne({ originalUrl });
    
    // If the URL exists, return the existing short URL
    if (url) {
      return res.json({
        originalUrl: url.originalUrl,
        shortUrl: `${baseUrl}/${url.urlCode}`,
        urlCode: url.urlCode,
        createdAt: url.createdAt,
      });
    }
    
    // Find or create the counter document
    let counter = await Counter.findOne({ name: 'url_count' });
    if (!counter) {
      counter = new Counter({ name: 'url_count', value: 0 });
    }
    
    // Increment the counter value
    counter.value += 1;
    await counter.save();
    
    // Generate a unique short URL code using Base62 encoding
    const urlCode = encode(counter.value);
    
    // Create a new URL object
    url = new Url({
      originalUrl,
      urlCode,
      createdAt: new Date(),
    });
    
    // Save the URL to the database
    await url.save();
    
    // Return the shortened URL information
    return res.json({
      originalUrl: url.originalUrl,
      shortUrl: `${baseUrl}/${url.urlCode}`,
      urlCode: url.urlCode,
      createdAt: url.createdAt,
    });
  } catch (err) {
    console.error('Error shortening URL:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Export the router
module.exports = router;