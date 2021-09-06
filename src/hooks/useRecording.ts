import { useState, useRef } from 'react';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

if (!ffmpeg.isLoaded()) {
  ffmpeg.load();
}

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
    downloadVideo: (type: string = 'webm', fileName: string = 'video') => downloadVideo(recordedChunks.current, type, fileName),
  };
}

function getVideoUrl(chunks: Blob[]): string {
	const blob = new Blob(chunks, { type: 'video/webm' });
	return window.URL.createObjectURL(blob);
}

async function downloadVideo(chunks: Blob[], type: string = 'webm', fileName: string = 'video') {
  const url = await convertVideo(chunks, type);
  const aElement = document.createElement('a');
	aElement.href = url;
	aElement.download = `${fileName}.${type}`;
	aElement.click();
}

// TODO: worker에서 동작하도록 수정
async function convertVideo (chunks: Blob[], type: string = 'webm') {
  const blob = new Blob(chunks, { type: 'video/webm' });

  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  // 메모리에 파일 올리기
  ffmpeg.FS('writeFile', 'video.webm', await fetchFile(blob));
  
  const convertMap: { [key:string]: () => Promise<void> } = {
    webm: () => Promise.resolve(),
    gif: () => ffmpeg.run('-i', 'video.webm', '-preset', 'ultrafast', '-r', '10', 'video.gif'),
    mp4: () => ffmpeg.run('-i', 'video.webm', '-preset', 'ultrafast', 'video.mp4'),
  };

  const mimeTypeMap: { [key: string]: string } = {
    webm: 'video/webm',
    gif: 'image/gif',
    mp4: 'video/mp4',
  };

  const convert = convertMap[type];
  const mimeType = mimeTypeMap[type];

  // 파일 형식에 맞게 변환
  await convert();

  // 파일 불러오기
  const data = ffmpeg.FS('readFile', `video.${type}`);

  const url = URL.createObjectURL(new Blob([data.buffer], { type:mimeType }));
  return url;
}

export default useRecording;