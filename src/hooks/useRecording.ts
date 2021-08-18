import { useState, useRef, useEffect } from 'react';


const constraints = {
  video: true,
  audio: false,
};

const options = {
  mimeType: 'video/webm;codecs=vp8,opus'
};

function useRecording() {
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  const [recording, setRecording] = useState(false);


  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    alert('지원하지 않는 브라우저입니다.');
  }

  const onRecording = (e: BlobEvent) => {
    if (e.data.size > 0) {
      recordedChunks.current.push(e.data);
    }
  };

  const onStop = () => {
    setRecording(false);
  };

  const startRecording = async () => {
    if (!mediaStream.current) {
      mediaStream.current = await navigator.mediaDevices.getDisplayMedia(constraints);
    }
    
    if (mediaStream.current) {
      mediaRecorder.current = new MediaRecorder(mediaStream.current, options);
      mediaRecorder.current.addEventListener('dataavailable', onRecording);
      mediaRecorder.current.addEventListener('stop', onStop);
      mediaRecorder.current.start();
    }

    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();

    const tracks = mediaStream.current?.getTracks();
    tracks?.forEach((track) => track.stop());

    mediaStream.current = null;
  };

  return {
    recording,
    startRecording,
    stopRecording,
    getLiveStream: () => mediaStream.current,
    getVideoUrl: () => getVideoUrl(recordedChunks.current),
    downloadVideo: () => downloadVideo(recordedChunks.current, 'video'),
  };
}

function getVideoUrl(chunks: Blob[]): string {
	const blob = new Blob(chunks, { type: 'video/webm' });
	return window.URL.createObjectURL(blob);
}

function downloadVideo(chunks: Blob[], fileName: string) {
	const blob = new Blob(chunks);

	const aElement = document.createElement('a');
	aElement.href = URL.createObjectURL(blob);
	aElement.download = `${fileName}.webm`;
	aElement.click();
}

export default useRecording;