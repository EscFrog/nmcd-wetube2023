import express from "express";
import {
  logout,
  edit,
  remove,
  see,
  startGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", startGithubLogin);
userRouter.get(":id", see);

export default userRouter;
