import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  // 위 코드는 축약형. 원래는 title: { type: String },
  description: String,
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
