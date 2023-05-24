import Video from "../models/Video";

/*
// 이제 몽구스는 callback 패턴을 사용하지 않고 await async 패턴만 사용하지만
// 만약 callback 패턴을 사용할 수 있었다면 다음과 같이 코드를 짤 수 있다.
Video.find({}, (error, videos) => {
    if (error) {
        return res.render("server-error");
    }
    return res.render("home", { pageTitle: "Home", videos });
});
*/


export const home = async(req, res) => {
    try {
        const videos = await Video.find({});
        return res.render("home", { pageTitle : "Home", videos })
    } catch {
        return res.rander("server-error")
    }
    
};

export const watch = (req, res) => {
    const {id} = req.params;
    return res.render("watch", {pageTitle : `Watching`});
};

export const getEdit = (req, res) => {
    const {id} = req.params;
    return res.render("edit", {pageTitle : `Editing`});
};

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { newTitle } = req.body;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle : "Upload Video"});
};

export const postUpload = (req, res) => {
    const {title} = req.body;
    return res.redirect("/");
}