import React from 'react';

type VideoProps = {
  autoPlay: boolean,
};

const Video = React.forwardRef(({ autoPlay }: VideoProps, ref: React.Ref<HTMLVideoElement>) => {
  return (
    <video style={{ width: '100%', backgroundColor: '#000' }} ref={ref} autoPlay={autoPlay} />
  );
});

Video.defaultProps = {
  autoPlay: false,
};

export default Video;