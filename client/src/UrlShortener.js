// UrlShortener.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import copy from 'copy-to-clipboard';
import './UrlShortener.css';

const UrlShortener = () => {
  // State variables
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [urlInfo, setUrlInfo] = useState(null);
  const [animate, setAnimate] = useState(false);

  // Animation effect for result container
  useEffect(() => {
    if (shortUrl) {
      setAnimate(true);
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [shortUrl]);

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
      const response = await axios.post('/api/url/shorten', {
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
      <div className="shortener-card">
        <h2 className="shortener-title">Shorten Your Link</h2>
        <p className="shortener-subtitle">Paste your long URL below to create a shorter, more manageable link</p>
        
        <form className="url-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-wrapper">
              <i className="fas fa-link input-icon"></i>
              <input
                type="text"
                className="url-input"
                placeholder="Paste your long URL here..."
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              className={`shorten-button ${loading ? 'loading' : ''}`} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  <span>Shortening...</span>
                </>
              ) : (
                <>
                  <span>Shorten URL</span>
                  <i className="fas fa-arrow-right"></i>
                </>
              )}
            </button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>

      {shortUrl && (
        <div className={`result-container ${animate ? 'animate-result' : ''}`}>
          <div className="result-header">
            <h3>Your shortened URL is ready!</h3>
            <div className="pulse-effect"></div>
          </div>
          
          <div className="url-details">
            <div className="original-url">
              <span className="label">Original URL:</span>
              <p className="url-text">{originalUrl}</p>
            </div>
            
            <div className="shortened-url">
              <span className="label">Shortened URL:</span>
              <div className="short-url-wrapper">
                <a 
                  href={shortUrl} 
                  className="short-url" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  {shortUrl}
                </a>
                <button className="copy-btn" onClick={handleCopy} aria-label="Copy to clipboard">
                  {copied ? (
                    <i className="fas fa-check check-icon"></i>
                  ) : (
                    <>
                      <i className="fas fa-copy"></i>
                      <span className="copy-text">Copy</span>
                    </>
                  )}
                </button>
                {copied && <span className="copied-alert">Copied!</span>}
              </div>
            </div>
          </div>
          
          {urlInfo && urlInfo.createdAt && (
            <div className="url-meta">
              <span className="creation-time">
                <i className="far fa-clock"></i>
                Created: {new Date(urlInfo.createdAt).toLocaleString()}
              </span>
              <div className="qr-wrapper">
                <i className="fas fa-qrcode"></i>
                <div className="qr-code">
                  {/* This would be an actual QR code image in production */}
                  <div className="qr-placeholder">
                    <i className="fas fa-qrcode qr-icon"></i>
                  </div>
                  <span>Scan QR Code</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="benefits">
        <div className="benefit">
          <i className="fas fa-bolt"></i>
          <span>Fast & Reliable</span>
        </div>
        <div className="benefit">
          <i className="fas fa-chart-bar"></i>
          <span>Track Clicks</span>
        </div>
        <div className="benefit">
          <i className="fas fa-shield-alt"></i>
          <span>Secure Links</span>
        </div>
        <div className="benefit">
          <i className="fas fa-infinity"></i>
          <span>Never Expires</span>
        </div>
      </div>
    </div>
  );
};

export default UrlShortener;