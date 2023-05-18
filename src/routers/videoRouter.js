import express from "express";
import {upload, watch, edit, deleteVideo} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
// :은 파라미터라는 표시. 파라미터를 사용하는 라우터가 그렇지 않은 라우터 위로 올라가면, url의 일부를 변수로 착각할 수 있으므로 순서에 주의해야 한다.
videoRouter.get("/:id(\\d+)", watch);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;