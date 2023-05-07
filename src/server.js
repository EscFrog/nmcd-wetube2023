import express from "express";  // express를 가져오는 최신 문법. 이 코드를 babel이 아래 코드로 변환해준다.
//const express = require("express");
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const home = (req, res) => res.send("hello~!🙋‍♂️");

const login = (req, res) => res.send("login page");

// get 메소드는 콜백 함수를 필요로한다. 매개 변수는 두 개가 필요한데, 각각 request, respons object를 받는다.
app.use(logger);
app.get("/", home);
app.get("/login", login);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🚀`)

app.listen(PORT, handleListening);  // express를 시작하고 본격적으로 대기 상대로 만든다.