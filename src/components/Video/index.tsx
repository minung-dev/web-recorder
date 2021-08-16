import React from 'react';

type VideoProps = {};

const Video = React.forwardRef((props: VideoProps, ref: React.Ref<HTMLVideoElement>) => {
  return (
    <video style={{ width: '100%', backgroundColor: '#000' }} ref={ref} />
  );
});

Video.defaultProps = {
};

export default Video;