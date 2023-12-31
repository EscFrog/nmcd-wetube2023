const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

const textarea = document.querySelector("#commentForm textarea");

let controlsTimeout = null;
let controlsMovementTimeout = null;

const initVolume = volumeRange.value;
let volumeRecorder = initVolume;
video.volume = volumeRecorder;

const handlePlayClick = () => {
  if (video.paused) {
    video.play();
    playBtnIcon.className = "fas fa-pause";
  } else {
    video.pause();
    playBtnIcon.className = "fas fa-play";
  }
};

const volumeBtnChanger = () => {
  muteBtnIcon.className = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
    if (volumeRecorder <= 0) {
      volumeRecorder = initVolume;
    }
    volumeRange.value = video.volume = volumeRecorder;
  } else {
    video.muted = true;
    volumeRange.value = 0;
  }
  volumeBtnChanger();
};

const handleVolumeChange = (event) => {
  const {
    target: { value },
  } = event;

  volumeRecorder = video.volume = value;
  video.muted = volumeRecorder <= 0 ? true : false;
  volumeBtnChanger();
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substring(14, 19);

const handleCanplay = () => {
  if (!isNaN(video.duration)) {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeline.max = Math.floor(video.duration);
  }
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 1500);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 2000);
};

const handleTimelineChange = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
};

const changeFullscreenIcon = () => {
  const fullscreen = document.fullscreenElement;
  if (fullscreen) {
    fullScreenBtnIcon.classList = "fas fa-compress";
  } else {
    fullScreenBtnIcon.classList = "fas fa-expand";
  }
};

const handleKeyDown = (event) => {
  if (document.activeElement === textarea) {
    return;
  }
  if (event.code === "Space") {
    event.preventDefault();
    handleMouseMove();
    handlePlayClick();
  }
  if (event.code === "Enter") {
    event.preventDefault();
    handleMouseMove();
    handleFullScreen();
  }
  if (event.key === "m") {
    handleMouseMove();
    handleMute();
  }
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });
};

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("canplay", handleCanplay);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("click", handlePlayClick);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
document.addEventListener("fullscreenchange", changeFullscreenIcon);
document.addEventListener("keydown", handleKeyDown);

handleCanplay();
