import React, { useState, useRef, useEffect } from 'react';

import Button from '../../components/Button';
import Video from '../../components/Video';

import useToggle from '../../hooks/useToggle';
import useRecording from '../../hooks/useRecording';

type RecordPageProps = {};
function RecordPage(props: RecordPageProps) {
  const { recordState, startRecording, stopRecording, getLiveStream, getVideoUrl, downloadVideo } = useRecording(); 

  const recordingVideoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  const recording = recordState === 'recording';
  const stopped = recordState === 'stopped';

  useEffect(() => {
    if (recordingVideoRef.current && recording) {
      recordingVideoRef.current.srcObject = getLiveStream();
    } else if (recordingVideoRef.current && stopped) {
      recordingVideoRef.current.srcObject = null;
    }

    if (previewVideoRef.current && stopped) {
      previewVideoRef.current.src = getVideoUrl();
    }
  }, [recordState]);

  return (
    <div className="container">
      <section className="section">
        {stopped ? (
          <Video key="preview" ref={previewVideoRef} autoPlay controls />
        ) : (
          <Video key="record" ref={recordingVideoRef} autoPlay />
        )}
     
        <Button onClick={recording ? stopRecording : startRecording}>
          {recording ? '녹화 종료' : '녹화 시작'}
        </Button>
  
        {stopped && (
          <Button onClick={() => downloadVideo()}>
            다운로드
          </Button>
        )}
      </section>
    </div>
  );
}

RecordPage.defaultProps = {
};

export default RecordPage;