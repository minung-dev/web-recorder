import { useState, useRef, useEffect } from 'react';

const options = {
  mimeType: 'video/webm;codecs=vp8,opus'
};

function useRecording(mediaStream: MediaStream | null) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Array<Blob>>([]);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (mediaStream) {
      mediaRecorderRef.current = new MediaRecorder(mediaStream, options);

      mediaRecorderRef.current.addEventListener('dataavailable', (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      });

      mediaRecorderRef.current.addEventListener('stop', () => {
        setRecording(false);
      });
    }
  }, [mediaStream]);

  if (!MediaRecorder.isTypeSupported(options.mimeType)) {
    alert('지원하지 않음');
  }

  const startRecording = () => {
    mediaRecorderRef.current?.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  return {
    recording,
    startRecording,
    stopRecording,
  };
}

export default useRecording;