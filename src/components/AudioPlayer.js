import React, { useState } from 'react';

const AudioPlayer = ({ audioUrl }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <audio src={audioUrl} controls={true} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
  );
};

export default AudioPlayer;
