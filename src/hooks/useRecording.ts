import { useState, useRef } from 'react';

const constraints = {
  video: true,
  audio: false,
};

const options = {
  mimeType: 'video/webm;codecs=vp8,opus'
};

type RecordState = 'idle' | 'recording' | 'stopped';

function useRecording() {
  const [recordState, setRecordState] = useState<RecordState>('idle');
  const mediaStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    alert('지원하지 않는 브라우저입니다.');
  }

  const onRecording = (e: BlobEvent) => {
    if (e.data.size > 0) {
      recordedChunks.current.push(e.data);
    }
  };

  const onStop = () => {
    setRecordState('stopped');

    const tracks = mediaStream.current?.getTracks();
    tracks?.forEach((track) => track.stop());

    mediaStream.current = null;
  };

  const startRecording = async () => {
    recordedChunks.current = []; // clear chunks

    if (!mediaStream.current) {
      mediaStream.current = await (navigator.mediaDevices as any).getDisplayMedia(constraints);
    }
    
    if (mediaStream.current) {
      mediaRecorder.current = new MediaRecorder(mediaStream.current, options);
      mediaRecorder.current.addEventListener('dataavailable', onRecording);
      mediaRecorder.current.addEventListener('stop', onStop);
      mediaRecorder.current.start();
    }

    setRecordState('recording');
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
  };

  return {
    recordState,
    startRecording,
    stopRecording,
    getLiveStream: () => mediaStream.current,
    getVideoUrl: () => getVideoUrl(recordedChunks.current),
    downloadVideo: (fileName: string = 'video') => downloadVideo(recordedChunks.current, fileName),
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