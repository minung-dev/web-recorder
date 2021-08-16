import React, { useRef } from 'react';

import Button from '../../components/Button';
import Video from '../../components/Video';

declare global {
  interface MediaDevices {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;
  }
}

type RecordPageProps = {};
function RecordPage(props: RecordPageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleRecordClick = () => {
    const constraints = {
      video: true,
      audio: false,
    };
    navigator.mediaDevices.getDisplayMedia(constraints).then(function (mediaStream: MediaProvider | null) {
      if (!videoRef.current) {
        return;
      }
      // MediaStream을 HTMLVideoElement의 source 설정
      videoRef.current.srcObject = mediaStream;
    });
  };

  return (
    <div className="container">
      <section className="section">
        <Video ref={videoRef} autoPlay />
        <Button onClick={handleRecordClick}>
          녹화
        </Button>
      </section>
    </div>
  );
}

RecordPage.defaultProps = {
};

export default RecordPage;