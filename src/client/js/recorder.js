const startBtn = document.getElementById("startBtn");
const previewScreen = document.getElementById("preview");

let stream;
let recorder;

const handleDownload = () => {};

const handleStopRecording = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStopRecording);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStartRecording = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStartRecording);
  startBtn.addEventListener("click", handleStopRecording);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    const videoFile = URL.createObjectURL(event.data); // 브라우저 메모리에 비디오가 저장된 위치를 URL로 생성
    previewScreen.srcObject = null;
    previewScreen.src = videoFile;
    previewScreen.loop = true;
    previewScreen.play();
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  previewScreen.srcObject = stream;
  previewScreen.play();
};

init();

startBtn.addEventListener("click", handleStartRecording);
