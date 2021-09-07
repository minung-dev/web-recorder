# Web recorder

간단한 화면 녹화앱입니다. 미리보기가 가능하며 비디오 및 GIF 다운로드를 지원합니다.

## 사용 기술
- [MediaStream](https://developer.mozilla.org/ko/docs/Web/API/Media_Streams_API): 유저의 스크린 화면을 가져오는데 사용
- [MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder): 유저의 스크린 화면을 녹화하는데 사용
- [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm#usage): 녹화된 비디오를 gif, mp4로 변환하는데 사용
