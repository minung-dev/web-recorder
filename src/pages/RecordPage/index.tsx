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
      // metadata가 로드될 때 실행되는 이벤트
      videoRef.current.onloadedmetadata = () => {
        // HTMLVideoElement로 카메라의 화면을 출력하기 시작
        videoRef?.current?.play();
      };
    });
  };

  return (
    <div className="container">
      <section className="section">
        <Video ref={videoRef} />
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