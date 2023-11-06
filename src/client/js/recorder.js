const startBtn = document.getElementById("startBtn");
const previewScreen = document.getElementById("preview");

let stream;

const handleStopRecording = () => {
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleStopRecording);
  startBtn.addEventListener("click", handleStartRecording);
};

const handleStartRecording = () => {
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStartRecording);
  startBtn.addEventListener("click", handleStopRecording);
  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    console.log("recording done");
    console.log(event);
    console.log(event.data);
  };
  console.log(recorder);
  recorder.start();
  console.log(recorder);
  setTimeout(() => {
    recorder.stop();
  }, 5000);
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
