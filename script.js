const postsUrl = "https://jsonplaceholder.typicode.com/posts";
const postPopup = document.getElementById("post-popup");
const postPopupClose = document.getElementById("post-popup-close");
const postPopupTitle = document.getElementById("post-popup-title");
const postPopupBody = document.getElementById("post-popup-body");

postPopupClose.addEventListener("click", () => {
  postPopup.classList.remove("active");
  postPopupTitle.innerHTML = "";
  postPopupBody.innerHTML = "";
});

const ajax = (url, method, callback) => {
  const req = new XMLHttpRequest();
  req.open(method, url);
  req.addEventListener("load", () => {
    callback(JSON.parse(req.responseText));
  });
  req.send();
}

const displayPosts = (posts) => {
  const postsContainer = document.getElementById("container-posts");

  for (const post of posts) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");
    postElement.id = `${post.id}`;
    postElement.innerHTML = `
      <h2 id=${post.id}>${post.title}</h2>
      <p id=${post.id}>${post.body}</p>
    `;
    postElement.addEventListener("click", onPostClick);
    postsContainer.appendChild(postElement);
  }
};

const displayPost = (post) => {
  postPopup.classList.add("active");
  postPopupTitle.innerHTML = post.title;
  postPopupBody.innerHTML = post.body;
};


const getPosts = () => {
  ajax(postsUrl, "GET", displayPosts);
};

const onPostClick = (event) => {
  const postId = event.target.id;
  const postUrl = `${postsUrl}/${postId}`;
  ajax(postUrl, "GET", displayPost);
};

getPosts();
