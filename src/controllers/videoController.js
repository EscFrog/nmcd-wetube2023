import Video from "../models/Video";

/*
// 이제 몽구스는 callback 패턴을 사용하지 않고 await async 패턴만 사용하지만
// 만약 callback 패턴을 사용할 수 있었다면 다음과 같이 코드를 짤 수 있다.
Video.find({}, (error, videos) => {
    return res.render("home", { pageTitle: "Home", videos });
});
*/

export const home = async (req, res) => {
  const videos = await Video.find({}); // await 키워드는 반드시 async 함수 안에서만 사용해야 한다.
  console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { newTitle, newDescription, newHashtags } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }
  video.title = newTitle;
  video.description = newDescription;
  video.hashtags = newHashtags
    .replace(/\s/g, "")
    .split(",")
    .map((word) => `#${word}`);
  await video.save();
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { videoTitle, description, hashtags } = req.body;
  try {
    await Video.create({
      title: videoTitle,
      description,
      hashtags: hashtags
        .replace(/\s/g, "")
        .split(",")
        .map((word) => `#${word}`), // hashtags 값에서, 공백을 제거하고, ","를 기준으로 분할한 후, "#"문자를 붙여 배열로 반환한다.
    });
    return res.redirect("/");
  } catch {
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
