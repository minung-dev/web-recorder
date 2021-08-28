import React, { useRef, useEffect } from 'react';

import Section from '../../components/Section';
import Button from '../../components/Button';
import Video from '../../components/Video';
import DownloadPanel from '../../components/DownloadPanel';

import useRecording from '../../hooks/useRecording';

type RecordPageProps = {};
function RecordPage(props: RecordPageProps) {
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

  const handleDownloadClick = async (type: string) => {
    const handlerMap: {
      [key: string]: (filename?: string) => void | Promise<void>
    } = {
      video: downloadVideo,
      gif: downloadGif,
    }

    await handlerMap[type]();
  };

  return (
    <div className="container is-flex is-flex-direction-column">
      <Section>
        {stopped ? (
          <Video key="preview" ref={previewVideoRef} autoPlay controls />
        ) : (
          <Video key="record" ref={recordingVideoRef} autoPlay muted />
        )}
        <Button className="mt-2" onClick={recording ? stopRecording : startRecording}>
          {recording ? '녹화 종료' : '녹화 시작'}
        </Button>
      </Section>
      {stopped && (
        <DownloadPanel onDownloadClick={handleDownloadClick} />
      )}
    </div>
  );
}

RecordPage.defaultProps = {
};

export default RecordPage;