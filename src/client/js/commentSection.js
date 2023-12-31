const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const delIcon = document.querySelectorAll(
  ".video__comment .video__comment__info .fa-trash-can"
);

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const videoComment = document.createElement("li");
  videoComment.className = "video__comment";
  videoComment.dataset.id = id;

  const commentInfo = document.createElement("div");
  commentInfo.className = "video__comment__info";
  videoComment.appendChild(commentInfo);

  const bubbleIcon = document.createElement("i");
  bubbleIcon.className = "fas fa-comment";
  commentInfo.appendChild(bubbleIcon);

  const commentOwner = document.createElement("div");
  commentOwner.className = "comment__owner";
  const commentOwnerName = document.createElement("span");
  commentOwnerName.innerText = "You";
  commentOwner.appendChild(commentOwnerName);
  commentInfo.appendChild(commentOwner);

  const delIcon = document.createElement("i");
  delIcon.className = "fa-solid fa-trash-can";
  commentInfo.appendChild(delIcon);

  const commentText = document.createElement("div");
  commentText.className = "video__comment__text";
  commentText.innerText = `${text}`;
  videoComment.appendChild(commentText);

  videoComments.prepend(videoComment);
  delIcon.addEventListener("click", handleDeleteComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDeleteComment = async (event) => {
  const comment = event.target.parentNode.parentNode;
  console.log(comment);
  const commentId = comment.dataset.id;

  const response = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });

  if (response.status === 200) {
    comment.remove();
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (delIcon) {
  delIcon.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", handleDeleteComment);
  });
}
