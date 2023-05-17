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
        views: 59,
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

export const search = (req, res) => res.send("Search");

export const upload = (req, res) => res.send("Upload Video");

export const see = (req, res) => {
    const {id} = req.params;
    // 위 코드는 ES6 문법으로서 아래 코드와 같다.
    // const id = req.params.id;
    const video = videos[id];
    return res.render("watch", {pageTitle : `Watching ${video.title}`})
};

export const edit = (req, res) => res.render("edit", {pageTitle : "Edit"});

export const deleteVideo = (req, res) => res.send("Delete Video");