import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

// RESTORE StrictMode. It's an essential tool for finding bugs like this.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);