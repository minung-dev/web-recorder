import { useState, useRef } from 'react';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

const constraints = {
  video: true,
  audio: true,
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
    downloadGif: (fileName: string = 'video') => downloadGif(recordedChunks.current, fileName),
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

async function downloadGif(chunks: Blob[], fileName: string) {
  const url = await convertToGif(chunks);
  const aElement = document.createElement('a');
	aElement.href = url;
	aElement.download = `${fileName}.gif`;
	aElement.click();
}

// TODO: worker에서 동작하도록 수정
async function convertToGif (chunks: Blob[]) {
  const blob = new Blob(chunks, { type: 'video/webm' });

  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  // 메모리에 파일 올리기
  ffmpeg.FS('writeFile', 'test.webm', await fetchFile(blob));
  
  // gif로 변환
  await ffmpeg.run('-i', 'test.webm', '-r', '10', 'out.gif');
  // TODO: mp4 다운로드 기능 지원
  // await ffmpeg.run('-i', 'test.webm', '-c:a', 'libopus', '-b:a', '96K', '-strict', 'out.mp4');

  // 파일 불러오기
  const data = ffmpeg.FS('readFile', 'out.gif');

  const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }));
  return url;
}

export default useRecording;