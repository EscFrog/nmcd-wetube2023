import express from "express";  // express를 가져오는 최신 문법. 이 코드를 babel이 아래 코드로 변환해준다.
//const express = require("express");

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // 미들웨어 함수에서 다음 함수로 넘어갈 때 쓰는 함수.
}

const handleHome = (req, res) => {
    return res.send("Route Finish!!!");
};

// get 메소드는 콜백 함수를 필요로한다. 매개 변수는 두 개가 필요한데, 각각 request, respons object를 받는다.
app.get("/", logger, handleHome);


const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🚀`)

app.listen(PORT, handleListening);  // express를 시작하고 본격적으로 대기 상대로 만든다.