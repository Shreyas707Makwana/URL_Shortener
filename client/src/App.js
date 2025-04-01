// App.js
import React, { useEffect } from 'react';
import UrlShortener from './UrlShortener';
import './App.css';

// Import FontAwesome components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function App() {
  // Animation effect for elements with the 'animate' class
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      animatedElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
  
  return (
    <div className="App">
      {/* Header with GitHub logo */}
      <header className="header">
        <div className="logo">
          <span className="chain-link">🔗</span>
          <h1>URLify</h1>
        </div>
        <nav>
          <a
            href="https://github.com/Shreyas707Makwana/URL_Shortener"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Replace <i> with FontAwesomeIcon */}
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
        </nav>
      </header>
      
      <div className="container">
        <div className="hero animate fade-up">
          <h1 className="heading">URL Shortening Made Simple</h1>
          <p className="subtitle">
            Transform lengthy URLs into clean, compact links in seconds with our powerful shortening service.
          </p>
        </div>
        
        <UrlShortener />
        
        {/* How It Works Section */}
        <section id="how-it-works" className="how-it-works">
          <h2 className="section-title animate fade-up">How It Works</h2>
          
          <div className="steps">
            <div className="step animate fade-right">
              <div className="step-icon">
                <i className="fas fa-paste"></i>
              </div>
              <h3>Paste Your URL</h3>
              <p>Enter your long URL in the input field above. We accept URLs of any length from any website.</p>
            </div>
            
            <div className="step animate fade-up">
              <div className="step-icon">
                <i className="fas fa-cut"></i>
              </div>
              <h3>Shorten It</h3>
              <p>Click the Shorten button to instantly generate a short, memorable link that's easy to share.</p>
            </div>
            
            <div className="step animate fade-left">
              <div className="step-icon">
                <i className="fas fa-share-alt"></i>
              </div>
              <h3>Share Anywhere</h3>
              <p>Copy your shortened URL with a single click and share it on social media, emails, or messages.</p>
            </div>
          </div>
          
          <div className="extra-info animate fade-up">
            <div className="info-item">
              <i className="fas fa-shield-alt"></i>
              <div>
                <h4>Secure & Reliable</h4>
                <p>All links are protected and available 24/7 with high-speed redirects.</p>
              </div>
            </div>
            <div className="info-item">
              <i className="fas fa-infinity"></i>
              <div>
                <h4>Never Expires</h4>
                <p>Your shortened URLs will work forever, with no expiration date.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer with Copyright */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="chain-link">🔗</span>
            <span>URLify</span>
          </div>
          <div className="copyright">
            &copy; {new Date().getFullYear()} URLify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
