const permissionBtn = document.getElementById('permission-btn');
const videoPreview = document.getElementById('video-preview');
const videoOutput = document.getElementById('video-output');
const startBtn = document.getElementById('start-btn');
const finishBtn = document.getElementById('finish-btn');

let mediaStream = null;
let mediaRecorder = null;
let recordedMediaUrl = null;

permissionBtn.addEventListener('click', function () {
	const constraints = {
    video: true,
    audio: false,
  };
	// 스크린 mediaStream 얻기
	navigator.mediaDevices.getDisplayMedia(constraints).then(function(mediaStream) {
		// 비디오 트랙을 포함한 MediaStream
		console.log(mediaStream);

		// 2. mediaStream을 HTMLVideoElement를 통해서 실시간으로 출력
		setPreview(mediaStream);

		// MediaStream을 통해 Record 이벤트 등록
		setRecorder(mediaStream);
	});
});


function setPreview(mediaStream) {
	// MediaStream을 HTMLVideoElement의 source 설정
	videoPreview.srcObject = mediaStream;
	// metadata가 로드될 때 실행되는 이벤트
	videoPreview.onloadedmetadata = function() {
		// HTMLVideoElement로 카메라의 화면을 출력하기 시작
		videoPreview.play();
	};
}

function setRecorder(stream) {
	if (!MediaRecorder.isTypeSupported('video/webm;codecs=vp8,opus')) {
		alert('지원하지 않음');
	}

	// 1.MediaStream을 매개변수로 MediaRecorder 생성자를 호출
	const options = {
		mimeType: 'video/webm;codecs=vp8,opus' // 최고 화질
	};
	const mediaRecorder = new MediaRecorder(stream, options);

	// 전달받는 데이터를 처리하는 이벤트 핸들러 등록
	// 매번 데이터가 준비될 때 마다 dataavailable 이벤트가 발생
	const recordedChunks = [];
	mediaRecorder.addEventListener('dataavailable', function(e) {
		if (e.data.size > 0) {
			recordedChunks.push(e.data);
		}
	});

  // record가 끝났을 때 이벤트 핸들러 등록
	// 여기서 그동안 쌓인 chunk 데이터를 가지고 처리를 해준다
	mediaRecorder.addEventListener('stop', function() {
		// video 예제
		// playVideo(recordedChunks);

		// download 예제
		downloadVideo(recordedChunks);
	});

	// 녹화 시작, 녹화 종료 핸들러 등록
	startBtn.onclick = () => {
		mediaRecorder.start();
	};
	finishBtn.onclick = () => {
		mediaRecorder.stop();
	};
}


// 생성된 Blob을 매개변수로 URL.createObjectURL 메서드를 호출하면 URL 생성
// url 사용 완료 이후에는 revokeObjectURL을 호출해줘야함 (메모리 누수 방지)


// video 예제
function playVideo(recordedChunks) {
	const blob = new Blob(recordedChunks, { type: 'video/webm' });
	const url = window.URL.createObjectURL(blob);
	videoOutput.src = url;
}

// 파일 다운로드 예제
function downloadVideo(recordedChunks) {
	const blob = new Blob(recordedChunks);

	const aElm = document.createElement('a');
	aElm.href = URL.createObjectURL(blob);
	aElm.download = 'audio.webm'; // 다운로드 받을 파일명
	aElm.click();
}




const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Options for getDisplayMedia()

var displayMediaOptions = {
  video: {
    cursor: "always"
  },
  audio: false
};

// Set event listeners for the start and stop buttons


async function startCapture() {
  logElem.innerHTML = "";

  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    dumpOptionsInfo();
  } catch(err) {
    console.error("Error: " + err);
  }
}
function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach(track => track.stop());
  videoElem.srcObject = null;
}
function dumpOptionsInfo() {
  const videoTrack = videoElem.srcObject.getVideoTracks()[0];

  console.info("Track settings:");
  console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.info("Track constraints:");
  console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}
            