// src/components/UrlShortener.js
import React, { useState } from 'react';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import { FaCopy, FaCheck } from 'react-icons/fa';
import './UrlShortener.css';

const UrlShortener = () => {
  // State variables
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [urlInfo, setUrlInfo] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setShortUrl('');
    setUrlInfo(null);
    
    // Validate URL input
    if (!originalUrl) {
      setError('Please enter a URL');
      return;
    }
    
    // Check if URL has a protocol (http/https)
    let urlToShorten = originalUrl;
    if (!urlToShorten.startsWith('http://') && !urlToShorten.startsWith('https://')) {
      urlToShorten = 'https://' + urlToShorten;
    }
    
    // Set loading state
    setLoading(true);
    
    try {
      // Send a POST request to our API
      const response = await axios.post('http://localhost:5000/api/url/shorten', {
        originalUrl: urlToShorten
      });
      
      // Update states with the response data
      setShortUrl(response.data.shortUrl);
      setUrlInfo(response.data);
      setLoading(false);
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  // Function to handle copying to clipboard
  const handleCopy = () => {
    copy(shortUrl);
    setCopied(true);
    
    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="url-shortener">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="url-input"
            placeholder="Enter a long URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button type="submit" className="shorten-button" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten'}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>

      {loading && (
        <div className="loading">Loading...</div>
      )}

      {shortUrl && (
        <div className="result-container">
          <div className="original-url">
            <strong>Original URL:</strong> {originalUrl}
          </div>
          <div className="short-url-container">
            <span className="short-url">{shortUrl}</span>
            <button className="copy-button" onClick={handleCopy}>
              {copied ? <FaCheck /> : <FaCopy />}
            </button>
            {copied && <span className="copy-feedback">Copied!</span>}
          </div>
          {urlInfo && (
            <div className="stats">
              <p>Created: {new Date(urlInfo.createdAt).toLocaleString()}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UrlShortener;