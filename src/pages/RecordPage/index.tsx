import React, { useState, useRef, useEffect } from 'react';

import Button from '../../components/Button';
import Video from '../../components/Video';

import useToggle from '../../hooks/useToggle';
import useRecording from '../../hooks/useRecording';

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
  }
}

type RecordPageProps = {};
function RecordPage(props: RecordPageProps) {
  const { recordState, startRecording, stopRecording, getLiveStream, getVideoUrl, downloadVideo } = useRecording(); 

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && (recordState === 'recording')) {
      videoRef.current.srcObject = getLiveStream();
    } else if (videoRef.current && (recordState === 'stopped')) {
      videoRef.current.srcObject = null;
    }
  }, [recordState, videoRef.current]);

  const handleRecordClick = () => {
    startRecording();
  };

  const handleStopClick = () => {
    stopRecording();
  };

  const recording = recordState === 'recording';

  return (
    <div className="container">
      <section className="section">
        <Video ref={videoRef} autoPlay />
        {!recording && (
          <Button onClick={handleRecordClick}>
            녹화 시작
          </Button>
        )}
        {recording && (
          <Button onClick={handleStopClick}>
            녹화 종료
          </Button>
        )}
      </section>
    </div>
  );
}

RecordPage.defaultProps = {
};

export default RecordPage;