import express from "express";  // express를 가져오는 최신 문법. 이 코드를 babel이 아래 코드로 변환해준다.
//const express = require("express");

const PORT = 4000;

const app = express();

// get 메소드는 콜백 함수를 필요로한다. 매개 변수는 두 개가 필요한데, 각각 request, respons object를 받는다.
app.get("/", (req, res) => {return res.send("Did you ask something?")});
// app.get("/", (req, res) => {return res.end()});

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT} 🚀`)

app.listen(PORT, handleListening);