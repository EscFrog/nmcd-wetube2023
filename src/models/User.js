import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    // 패스워드가 변경되었을 때만... 이 조건문을 넣은 이유는 비디오를 저장할 때도 user모델을 DB에 새로 저장하기 때문.
    this.password = await bcrypt.hash(this.password, 5); // 마지막 숫자는 saltRounds, 즉 해싱을 몇 번 반복할 것인가를 의미...
  }
});

const User = mongoose.model("User", userSchema);
export default User;
