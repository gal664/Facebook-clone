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
      let newPost = createElement("div", "feed-item", elements.feed);
      let postHeader = createElement("div", "feed-item__header", newPost);
      let headerLeft = createElement("div", "header_left", postHeader)
      let headerRight = createElement("div", "header_right", postHeader)
      let user_name = createElement("span", "user_name", headerLeft);
      let postTime = createElement("span", "timestamp", headerLeft);
      let removePostBtn = createElement("button", "remove_post_btn", headerRight);
      let post = createElement("div", "post_text", newPost);
      user_name.innerText = "Gal Yaniv";
      removePostBtn.innerText = "Remove Post";
      postTime.innerText = new Date().toLocaleTimeString();
      post.innerText = postText;
      removePostBtn.addEventListener('click', (event) => { elements.feed.removeChild(newPost) })
            return newPost;
}
