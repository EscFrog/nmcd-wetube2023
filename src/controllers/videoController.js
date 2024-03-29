import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";
import isHeroku from "../checkENV";

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  // const video = await Video.findById(id).populate("owner").populate("comments");
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.render("404", { pageTitle: "Video not found." });
  }

  const commentPromises = video.comments.map(async (comment) => {
    return await Comment.findById(comment).populate("owner");
  });

  const commentObjs = await Promise.all(commentPromises);
  console.log(commentObjs);

  return res.render("watch", { pageTitle: video.title, video, commentObjs });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "You are not the owner of the video.");
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { newTitle, newDescription, newHashtags } = req.body;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title: newTitle,
    description: newDescription,
    hashtags: Video.formatHashtags(newHashtags),
  });
  req.flash("success", "Changes saved.");
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session; // 현재 접속한 세션의 유저 id
  const { video, thumb } = req.files;
  const { videoTitle, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title: videoTitle,
      description,
      fileUrl: isHeroku ? video[0].location : `/${video[0].path}`,
      thumbUrl: isHeroku ? thumb[0].location : `/${thumb[0].path}`,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id); // DB에서 세션의 유저를 찾는다.
    user.videos.push(newVideo._id);
    user.save();
    req.flash("success", "Video upload success.");
    return res.redirect("/");
  } catch (error) {
    req.flash("error", `${error._massage}`);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session; // 현재 접속한 세션의 유저 id

  const video = await Video.findById(id).populate("owner");

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }

  if (String(video.owner._id) !== String(_id)) {
    req.flash("error", "You are not the owner of the video.");
    return res.status(403).redirect("/");
  }

  video.owner.videos.splice(video.owner.videos.indexOf(id), 1);
  await video.owner.save();

  await Video.findByIdAndDelete(id);
  req.flash("success", "The video has deleted");
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  await video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);
  const writer = await User.findById(user._id);

  if (!video) {
    return res.sendStatus(404);
  }

  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });

  video.comments.push(comment._id);
  video.save();

  writer.comments.push(comment._id);
  writer.save();

  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { id },
  } = req;

  const comment = await Comment.findById(id);
  const videoId = comment.video;
  const video = await Video.findById(videoId);
  const ownerId = comment.owner;
  const owner = await User.findById(ownerId);

  if (String(_id) !== String(ownerId)) {
    return res.sendStatus(403);
  }

  video.comments.splice(video.comments.indexOf(id), 1);
  await video.save();

  owner.comments.splice(owner.comments.indexOf(id), 1);
  await owner.save();

  await Comment.findByIdAndDelete(id);

  return res.sendStatus(200);
};
