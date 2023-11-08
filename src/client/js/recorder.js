import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const previewScreen = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));
  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const mp4Url = URL.createObjectURL(mp4Blob);

  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "MyRecording.mp4";
  // a.href = videoFile;
  // a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
  init();
};

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
    videoFile = URL.createObjectURL(event.data); // 브라우저 메모리에 비디오가 저장된 위치를 URL로 생성
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
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleDownload);
  startBtn.addEventListener("click", handleStartRecording);
};

init();
