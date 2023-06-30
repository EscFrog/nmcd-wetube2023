import express from "express"; // express를 가져오는 최신 문법. 이 코드를 babel이 아래 코드로 변환해준다.
//const express = require("express");
import morgan from "morgan";
import session from "express-session";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug"); // express에게 view engine을 퍼그로 쓸 거라고 알려준다.
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true })); // 순서가 중요하다. 비디오 라우터로 가기 전에 이 미들웨어에서 form의 데이터를 인코드한다.

app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;
