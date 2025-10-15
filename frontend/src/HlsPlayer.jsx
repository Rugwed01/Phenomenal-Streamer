// src/HlsPlayer.jsx
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HlsPlayer = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let hls;
    const videoElement = videoRef.current;

    if (Hls.isSupported() && videoElement) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play().catch(() => {
          console.log("Browser prevented autoplay; user interaction is needed.");
        });
      });
    }
    return () => { if (hls) hls.destroy(); };
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      muted // Muted is required for most browsers to allow autoplay
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default HlsPlayer;