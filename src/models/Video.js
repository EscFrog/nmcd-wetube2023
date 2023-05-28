import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // 위 코드는 축약형. 원래는 title: { type: String },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
