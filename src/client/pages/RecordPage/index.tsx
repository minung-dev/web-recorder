import React, { useRef, useEffect } from 'react';

import Section from '../../components/Section';
import Button from '../../components/Button';
import Video from '../../components/Video';
import DownloadPanel from '../../components/DownloadPanel';
import Progress from '../../components/Progress';

import useRecording from '../../hooks/useRecording';

import utilExtension from '../../utils/extension';

type RecordPageProps = { extensionMode: boolean };
function RecordPage({ extensionMode }: RecordPageProps) {
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

  const handleDownloadClick = async (type: string) => {
    await downloadVideo(type);
  };

  const handleAddToolClick = () => {
    utilExtension.sendMessage({ action: 'web-recorder-tools-active' });
  };

  return (
    <div className="container is-flex is-flex-direction-column">
      <Section>
        {stopped ? (
          <Video key="preview" ref={previewVideoRef} autoPlay controls />
        ) : (
          <Video key="record" ref={recordingVideoRef} autoPlay muted />
        )}
        <Progress on={recording} />
        <Button className="mt-2" onClick={recording ? stopRecording : startRecording}>
          {recording ? '녹화 종료' : '녹화 시작'}
        </Button>
        {extensionMode && (
          <>
            <hr />
            <Button outline onClick={handleAddToolClick}>
              현재 페이지에 발표 도구 추가
            </Button>
          </>
        )}
      </Section>
      <DownloadPanel open={stopped} onDownloadClick={handleDownloadClick} />
    </div>
  );
}

RecordPage.defaultProps = {
};

export default RecordPage;