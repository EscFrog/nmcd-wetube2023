const startBtn = document.getElementById("startBtn");
const previewScreen = document.getElementById("preview");

let stream;
let recorder;

const handleStopRecording = () => {
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleStopRecording);
  startBtn.addEventListener("click", handleStartRecording);
  recorder.stop();
};

const handleStartRecording = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStartRecording);
  startBtn.addEventListener("click", handleStopRecording);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    console.log(event.data);
  };
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: { width: 400, height: 300 },
  });
  previewScreen.srcObject = stream;
  previewScreen.play();
};

init();

startBtn.addEventListener("click", handleStartRecording);
