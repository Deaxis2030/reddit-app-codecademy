import React, { useEffect, useRef } from 'react';

//Used this import method to avoid an error where Player variable was always undefined
const dashjs = require('dashjs');

//Start of VideoPlayer function
const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    let player;
    try {
      player = dashjs.MediaPlayer().create();
      player.initialize(videoElement, url, true);
    } catch (error) {
      console.error('Error initializing dash.js player:', error);
    }

    return () => {
      if (player) {
        player.reset();
      }
    };
  }, [url]);
  
  //Return Section
  return (
    <video
      ref={videoRef}
      controls
      muted
      loop
      autoPlay
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

export default VideoPlayer;
