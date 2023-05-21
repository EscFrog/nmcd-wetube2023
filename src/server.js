import "./db";  // 파일을 임포트하면 즉시 실행된다.
import express from "express";  // express를 가져오는 최신 문법. 이 코드를 babel이 아래 코드로 변환해준다.
//const express = require("express");
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const PORT = 4000;

// console.log(process.cwd());

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");  // express에게 view engine을 퍼그로 쓸 거라고 알려준다.
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true})); // 순서가 중요하다. 비디오 라우터로 가기 전에 이 미들웨어에서 form의 데이터를 인코드한다.

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


const handleListening = () => console.log(`✅ Server listening on http://localhost:${PORT} 🚀`)
app.listen(PORT, handleListening);  // express를 시작하고 본격적으로 대기 상대로 만든다.