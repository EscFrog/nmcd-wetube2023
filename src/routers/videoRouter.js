import express from "express";
import {watch, getEdit, postEdit, getUpload, postUpload} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
// 위 코드는 아래 두 줄의 코드를 축약한 것이다. 이를 체인 메서드 패턴이라고 하는데, 객체의 메소드가 객체 자신을 반환하기 때문에 메소드를 이어서 호출할 수 있는 것이다.
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit)

videoRouter.route("/upload").get(getUpload).post(postUpload);

export default videoRouter;
