const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const delIcon = document.querySelectorAll(".video__comment i");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  newComment.dataset.id = id;
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text} `;
  const delIcon = document.createElement("i");
  delIcon.className = "fa-solid fa-trash-can";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(delIcon);
  videoComments.prepend(newComment);
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
  const comment = event.target.parentNode;
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
