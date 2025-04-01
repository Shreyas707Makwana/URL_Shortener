const express = require('express');
const router = express.Router();
const Url = require('../models/Url');

// Route to handle redirects
router.get('/:code', async (req, res) => {
  try {
    // Find the URL by the provided code
    const url = await Url.findOne({ urlCode: req.params.code });
    
    // If the URL exists, redirect to the original URL
    if (url) {
      // Increment the click counter
      url.clicks += 1;
      await url.save();
      
      return res.redirect(url.originalUrl);
    } else {
      // If the URL doesn't exist, return 404
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    console.error('Error redirecting:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Export the router
module.exports = router;