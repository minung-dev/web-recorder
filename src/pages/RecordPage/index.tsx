import React, { useState, useRef, useEffect } from 'react';

import Button from '../../components/Button';
import Video from '../../components/Video';

import useToggle from '../../hooks/useToggle';
import useRecording from '../../hooks/useRecording';

type RecordPageProps = {};
function RecordPage(props: RecordPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { recordState, startRecording, stopRecording, getLiveStream, getVideoUrl, downloadVideo, downloadGif } = useRecording(); 

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

  const handleVideoDownloadClick = () => {
    downloadVideo();
  }

  const handleGifDownloadClick = async () => {
    setIsLoading(true);
    await downloadGif();
    setIsLoading(false);
  };

  return (
    <div className="container is-flex is-flex-direction-column">
      <section className="section py-4">
        {stopped ? (
          <Video key="preview" ref={previewVideoRef} autoPlay controls />
        ) : (
          <Video key="record" ref={recordingVideoRef} autoPlay muted />
        )}
     
        <Button className="mt-2" onClick={recording ? stopRecording : startRecording}>
          {recording ? '녹화 종료' : '녹화 시작'}
        </Button>
        {stopped && (
          <>
            <Button className="mt-3" outline onClick={handleVideoDownloadClick}>
              비디오 다운로드
            </Button>
            <Button className="mt-3" outline loading={isLoading} onClick={handleGifDownloadClick}>
              GIF 다운로드
            </Button>
          </>
        )}
      </section>
    </div>
  );
}

RecordPage.defaultProps = {
};

export default RecordPage;