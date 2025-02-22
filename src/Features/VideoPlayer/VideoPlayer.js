import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';

export default function VideoPlayer  ({ url }) {
  const videoRef = useRef(null);
  console.log("checking video player", dashjs);


  useEffect(() => {
    const videoElement = videoRef.current;
    const player = dashjs.MediaPlayer().create();
    player.initialize(videoElement, url, true);

    return () => {
      player.reset();
    };
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: '100%', height: 'auto' }}
    />
  );
};


