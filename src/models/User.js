import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre("save", async function () {
  console.log("Users password:", this.password);
  this.password = await bcrypt.hash(this.password, 5); // 마지막 숫자는 saltRounds, 즉 해싱을 몇 번 반복할 것인가를 의미...
  console.log("Hashed password:", this.password);
});

const User = mongoose.model("User", userSchema);
export default User;
