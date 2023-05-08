import express from "express";  // express를 가져오는 최신 문법. 이 코드를 babel이 아래 코드로 변환해준다.
//const express = require("express");
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use(logger);

const globalRouter = express.Router();
const handleHome = (req, res) => res.send("Home");
globalRouter.get("/", handleHome);

const userRouter = express.Router();
const handleEditUser = (req, res) => res.send("Edit User");
userRouter.get("/edit", handleEditUser);

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("Watch Video");
videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🚀`)
app.listen(PORT, handleListening);  // express를 시작하고 본격적으로 대기 상대로 만든다.