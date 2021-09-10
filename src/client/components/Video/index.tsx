import React from 'react';

type VideoProps = {
  autoPlay?: boolean,
  controls?: boolean,
  muted?: boolean,
};

const Video = React.forwardRef(({ autoPlay, controls, muted }: VideoProps, ref: React.Ref<HTMLVideoElement>) => {
  return (
    <video style={{ width: '100%', height: '300px', backgroundColor: '#363636', borderRadius: '4px' }} ref={ref} autoPlay={autoPlay} controls={controls} muted={muted} />
  );
});

Video.defaultProps = {
  autoPlay: false,
  controls: false,
  muted: false,
};

export default Video;