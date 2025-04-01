// src/App.js
import React from 'react';
import UrlShortener from './components/UrlShortener';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="heading">URL Shortener</h1>
        <p className="subtitle">Paste a long URL and get a short link that never expires</p>
        <UrlShortener />
      </div>
    </div>
  );
}

export default App;