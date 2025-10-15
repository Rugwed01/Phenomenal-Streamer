// src/App.jsx (Reverted to original state)
import React, { useEffect, useState } from 'react';
import HlsPlayer from './HlsPlayer';
import './App.css';

function App() {
  const [streamUrl, setStreamUrl] = useState(null);
  const [overlays, setOverlays] = useState([]);
  const [newOverlayText, setNewOverlayText] = useState('');

  const API_BASE_URL = 'http://127.0.0.1:5000';
  const HLS_URL = `${API_BASE_URL}/stream/hls/stream.m3u8`;
  const START_STREAM_URL = `${API_BASE_URL}/start-stream`;
  const OVERLAYS_API_URL = `${API_BASE_URL}/api/overlays`;

  const fetchOverlays = () => {
    fetch(OVERLAYS_API_URL)
      .then(response => response.json())
      .then(data => setOverlays(data))
      .catch(error => console.error('Error fetching overlays:', error));
  };

  const handleCreateOverlay = (e) => {
    e.preventDefault();
    if (!newOverlayText) return;
    // Note: We are back to the simple overlay object without position/size
    const newOverlay = { type: 'text', content: newOverlayText, font: { size: 20, color: '#FFFFFF' }};
    fetch(OVERLAYS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOverlay)
    })
    .then(() => {
      fetchOverlays();
      setNewOverlayText('');
    })
    .catch(error => console.error('Error creating overlay:', error));
  };

  const handleDeleteOverlay = (id) => {
    fetch(`${OVERLAYS_API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchOverlays();
      })
      .catch(error => console.error('Error deleting overlay:', error));
  };

  useEffect(() => {
    fetch(START_STREAM_URL);
    const interval = setInterval(() => {
      fetch(HLS_URL).then(response => {
        if (response.ok) {
          console.log('✅ Stream is ready!');
          setStreamUrl(HLS_URL);
          fetchOverlays();
          clearInterval(interval);
        }
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>Phenomenal Streamer</h1>
      </header>
      <main className="main-content">
        <div className="video-section">
          
          {/* This is the original, stable display area for overlays */}
          <div className="overlay-display-area">
            {overlays.map(overlay => (
              <div key={overlay._id} className="overlay-display-item">
                {overlay.content}
              </div>
            ))}
          </div>

          <div className="video-wrapper">
            {streamUrl ? (
              <HlsPlayer url={streamUrl} />
            ) : (
              <p>Waiting for stream...</p>
            )}
          </div>
        </div>

        <div className="controls-section">
          <h2>Overlay Controls</h2>
          <form onSubmit={handleCreateOverlay} className="overlay-form">
            <input
              type="text"
              placeholder="Enter overlay text..."
              value={newOverlayText}
              onChange={(e) => setNewOverlayText(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
          <div className="overlay-list">
            <h3>Existing Overlays</h3>
            {overlays.map(overlay => (
              <div key={overlay._id} className="overlay-list-item">
                <span>{overlay.content}</span>
                <button onClick={() => handleDeleteOverlay(overlay._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;