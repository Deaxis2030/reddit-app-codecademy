import React, { useEffect, useRef } from "react";
const dashjs = require("dashjs");

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    let player;
    try {
      player = dashjs.MediaPlayer().create();
      player.updateSettings({
        streaming: {
          text: {
            defaultEnabled: false,
          },
        },
      });
      player.initialize(videoElement, url, true);
    } catch (error) {
      console.error("Error initializing dash.js player:", error);
    }

    return () => {
      if (player) {
        player.reset();
      }
    };
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      muted
      loop
      autoPlay
      style={{ width: "100%", height: "auto" }}
      data-testid="video-player"
    />
  );
};

export default VideoPlayer;