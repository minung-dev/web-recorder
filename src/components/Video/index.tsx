import React from 'react';

type VideoProps = {
  autoPlay?: boolean,
  controls?: boolean,
};

const Video = React.forwardRef(({ autoPlay, controls }: VideoProps, ref: React.Ref<HTMLVideoElement>) => {
  return (
    <video style={{ width: '100%', height: '300px', backgroundColor: '#363636', borderRadius: '4px' }} ref={ref} autoPlay={autoPlay} controls={controls} />
  );
});

Video.defaultProps = {
  autoPlay: false,
  controls: false,
};

export default Video;