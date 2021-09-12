import React from 'react';
import styles from './styles.module.css';

type VideoProps = {
  autoPlay?: boolean,
  controls?: boolean,
  muted?: boolean,
};

const Video = React.forwardRef(({ autoPlay, controls, muted }: VideoProps, ref: React.Ref<HTMLVideoElement>) => {
  return (
    <video className={styles.Video} ref={ref} autoPlay={autoPlay} controls={controls} muted={muted} />
  );
});

Video.defaultProps = {
  autoPlay: false,
  controls: false,
  muted: false,
};

export default Video;