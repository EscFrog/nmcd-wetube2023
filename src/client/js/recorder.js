import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const previewScreen = document.getElementById("preview");

let stream;
let recorder;
let videoFileUrl;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const tempAnchor = document.createElement("a");
  tempAnchor.href = fileUrl;
  tempAnchor.download = fileName;
  document.body.appendChild(tempAnchor);
  tempAnchor.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFileUrl));
  await ffmpeg.run("-i", files.input, "-r", "60", files.output);

  // 썸네일 이미지로 사용하기 위해 영상의 1초 지점의 1프레임을 thumbnail.jpg 파일로 저장한다.
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );

  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbFile = ffmpeg.FS("readFile", files.thumb);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "MyThumbnail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFileUrl);

  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  actionBtn.addEventListener("click", handleStartRecording);
};

const handleStopRecording = () => {
  actionBtn.innerText = "Download Recording";
  actionBtn.removeEventListener("click", handleStopRecording);
  actionBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStartRecording = () => {
  actionBtn.innerText = "Stop Recording";
  actionBtn.removeEventListener("click", handleStartRecording);
  actionBtn.addEventListener("click", handleStopRecording);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFileUrl = URL.createObjectURL(event.data); // 브라우저 메모리에 비디오가 저장된 위치를 URL로 생성
    previewScreen.srcObject = null;
    previewScreen.src = videoFileUrl;
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
  actionBtn.innerText = "Start Recording";
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.addEventListener("click", handleStartRecording);
};

init();
