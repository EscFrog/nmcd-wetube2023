export const trending = (req, res) => res.render("home");
export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("Upload Video");
export const see = (req, res) => res.render("watch")    // 파일명에 띄어쓰기가 있으면 안되고 언제나 소문자여야 한다.
export const edit = (req, res) => res.render("edit");
export const deleteVideo = (req, res) => res.send("Delete Video");