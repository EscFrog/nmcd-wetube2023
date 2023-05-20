let videos = [
    {
        title: "First Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 0,
    },
    {
        title: "Second Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 1,
        id: 1,
    },
    {
        title: "Third Video",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 59,
        id: 2,
    }
];

export const trending = (req, res) => {
    return res.render("home", { pageTitle : "Home", videos})
};

export const watch = (req, res) => {
    const {id} = req.params;
    // 위 코드는 ES6 문법으로서 아래 코드와 같다.
    // const id = req.params.id;
    const video = videos[id];
    return res.render("watch", {pageTitle : `Watching: ${video.title}`, video});
};

export const getEdit = (req, res) => {
    const {id} = req.params;
    const video = videos[id];
    return res.render("edit", {pageTitle : `Editing: ${video.title}`, video});
};

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { newTitle } = req.body;
    videos[id].title = newTitle;
    return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", {pageTitle : "Upload Video"});
};

export const postUpload = (req, res) => {
    // here i will add a video to the videos array.
    const newVideo = {
        title: req.body.videoTitle,
        rating: 0,
        comments: 0,
        createdAt: "just now",
        views: 0,
        id: videos.length,
    }
    console.log(newVideo);
    videos.push(newVideo);
    return res.redirect("/");
}