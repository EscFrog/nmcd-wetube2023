export const trending = (req, res) => {
    // const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const videos = [];
    return res.render("home", { pageTitle : "Home", videos})
};
export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("Upload Video");
export const see = (req, res) => res.render("watch", {pageTitle : "Watch"});    // 파일명에 띄어쓰기가 있으면 안되고 언제나 소문자여야 한다.
export const edit = (req, res) => res.render("edit", {pageTitle : "Edit"});
export const deleteVideo = (req, res) => res.send("Delete Video");