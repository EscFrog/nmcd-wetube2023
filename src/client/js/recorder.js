const startBtn = document.getElementById("startBtn");
const previewScreen = document.getElementById("preview");

const handleRecord = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: { width: 400, height: 300 },
  });
  previewScreen.srcObject = stream;
  previewScreen.play();
};

startBtn.addEventListener("click", handleRecord);
