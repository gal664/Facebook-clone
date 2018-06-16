document.addEventListener("DOMContentLoaded", function (event) {
      init();
});
function init() {
      elements = {
            header: document.querySelector(".page_header"),
            mainContainer: document.querySelector(".main_container"),
            contentContainer: document.querySelector(".content_container"),
            leftSidebar: document.querySelector(".left_sidebar"),
            rightSidebar: document.querySelector(".right_sidebar"),
            statusUpdate: document.querySelector(".status_update__input"),
            feed: document.querySelector(".main_feed__feed"),
      }
      elements.statusUpdate.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                  postText = elements.statusUpdate.value;
                  createNewPost(postText);
                  elements.statusUpdate.value = "";
            }
      });
}
function createElement(t, c, f) {
      let el = document.createElement(t);
      el.className = c;
      f.appendChild(el);
      return el;
}
//try and turn this into a class
function createNewPost(postText) {
      let newPost = document.createElement("div");
      newPost.className = "feed-item";
      elements.feed.insertBefore(newPost, elements.feed.firstChild);

      let postHeader = createElement("div", "feed-item__header", newPost);
      let headerLeft = createElement("div", "header_left", postHeader)
      let user_name = createElement("span", "user_name", headerLeft);
      let postTime = createElement("span", "timestamp", headerLeft);
      let headerRight = createElement("div", "header_right", postHeader)
      let removePostBtn = createElement("button", "remove_post_btn", headerRight);
      let post = createElement("div", "post_text", newPost);
      let postActions = createElement("div", "post_actions", newPost);
      let likesContainer = createElement("div", "likes_container", postActions);
      let likeBtn = createElement("button", "like_btn", likesContainer);
      let likesCounter = createElement("span", "likes_counter", likesContainer);
      let editPostBtn = createElement("button", "edit_post_button", postActions);
      likeBtn.innerText = "Like";
      likesCounter.innerText = 0;
      editPostBtn.innerText = "Edit";
      user_name.innerText = "Gal Yaniv";
      removePostBtn.innerText = "Remove Post";
      postTime.innerText = new Date().toLocaleTimeString();
      post.innerText = postText;
      removePostBtn.addEventListener('click', (event) => { elements.feed.removeChild(newPost) })
      editPostBtn.addEventListener('click', (event) => {
            editPostBtn.disabled = true;
            currentPostText = post.innerText;
            let editPost = createElement("input", "edit_post", newPost);
            newPost.replaceChild(editPost, post);
            editPost.value = currentPostText;
            editPost.focus();
            editPost.addEventListener('keydown', (event) => {
                  newPostText = editPost.value;
                  if (event.key === "Enter") {
                        editPostBtn.disabled = false;
                        newPost.replaceChild(post, editPost);
                        post.innerText = newPostText;
                  }
            })
      })
      // bug found: if there are more than 1 posts, the likes tuen negative on every other post.
      // probably the userLikedPost is global for all posts, need to make it only for the specific post.
      userLikedPost = false;
      likeBtn.addEventListener('click', (event) => {
            switch (userLikedPost) {
                  case false:
                        likesCounter.innerText++;
                        userLikedPost = true;
                        break;
                  case true:
                        likesCounter.innerText--;
                        userLikedPost = false;
                        break;
            }
      })
      return newPost;
}
