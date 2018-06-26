class User {
      constructor() {
            this.name = `Gal Yaniv`;
      }
};
class Feed {
      constructor() {
            this.element = createElement("div", "main_feed__feed", document.querySelector(".main_feed"), "");
            this.posts = [];
      }
}
class FeedItem {
      constructor(postObject) {
            this.postElement = null;
            this.defaultPostData = {
                  posterUserName: curUser.name,
                  timeStamp: new Date().toLocaleTimeString(),
                  postText: elements.statusUpdate.value,
                  postTextEdits: [],
                  likesCounter: 0,
                  timeEdited: "",
                  userLikedPost: false,
                  deleted: false,
            }
            this.postData = { ...this.defaultPostData, ...postObject };
            elements.feed.posts.push(this.postData);
      }
      createNewPost() {
            this.postElement = createElementFirst("div", "feed-item", elements.feed.element, "");
            let postHeader = createElement("div", "feed-item__header", this.postElement, "");
            let headerLeft = createElement("div", "header_left", postHeader, "")
            let user_name = createElement("span", "user_name", headerLeft, this.postData.posterUserName);
            let postTime = createElement("span", "postTimestamp", headerLeft, this.postData.timeStamp);
            let editTime = createElement("span", "editTimestamp", headerLeft, "");
            let headerRight = createElement("div", "header_right", postHeader, "")
            let removePostBtn = createElement("button", "remove_post_btn", headerRight, "Remove Post");
            let post = createElement("div", "post_text", this.postElement, this.postData.postText);
            let postActions = createElement("div", "post_actions", this.postElement, "");
            let likesContainer = createElement("div", "likes_container", postActions, "");
            let likeBtn = createElement("button", "like_btn", likesContainer, "Like");
            let likesCounter = createElement("span", "likes_counter", likesContainer, this.postData.likesCounter);
            let editPostBtn = createElement("button", "edit_post_button", postActions, "Edit");
            elements.statusUpdate.value = "";
            removePostBtn.addEventListener("click", (event) => {
                  elements.feed.element.removeChild(this.postElement);
                  this.postData.deleted = true;
            })
            editPostBtn.addEventListener("click", (event) => {
                  editPostBtn.disabled = true;
                  let currentPostText = post.innerText;
                  let editPost = createElement("input", "edit_post", this.postElement);
                  this.postElement.replaceChild(editPost, post);
                  editPost.value = currentPostText;
                  editPost.focus();
                  editPost.addEventListener('keydown', (event) => {
                        let newPostText = editPost.value;
                        if (event.key === "Enter") {
                              editPostBtn.disabled = false;
                              this.postElement.replaceChild(post, editPost);
                              post.innerText = newPostText;
                              editTime.innerText = `Last Edited: ${new Date().toLocaleTimeString()}`
                              this.postData.timeEdited = new Date().toLocaleTimeString()
                              this.postData.postTextEdits.push({ value: newPostText, time: this.postData.timeEdited });
                        }
                  })
            })
            likeBtn.addEventListener("click", (event) => {
                  console.log(this.postData.userLikedPost);
                  switch (this.postData.userLikedPost) {
                        case false:
                              console.log("false");
                              this.postData.likesCounter++;
                              this.postData.userLikedPost = true;
                              break;
                        case true:
                              console.log("true");
                              this.postData.likesCounter--;
                              this.postData.userLikedPost = false;
                              break;
                  }
                  console.log(this.postData.likesCounter);
                  likesCounter.innerText = this.postData.likesCounter;
            })
      }

}

let elements;
let curUser = new User();
document.addEventListener("DOMContentLoaded", function (event) { init() });
function init() {
      elements = getElements();
      createPostsFromServer()
      elements.statusUpdate.addEventListener('keydown', (event) => {
            if (event.key === "Enter" && elements.statusUpdate.value !== "") {
                  let newPost = new FeedItem();
                  newPost.createNewPost();
            }
      });
}
function createElement(t, c, f, txt) {
      let el = document.createElement(t);
      el.className = c;
      f.appendChild(el);
      el.innerText = txt;
      return el;
}
function createElementFirst(t, c, f, txt) {
      let el = document.createElement(t);
      el.className = c;
      f.insertBefore(el, f.firstChild);
      el.innerText = txt;
      return el;
}
function getElements() {
      let elements = {
            header: document.querySelector(".page_header"),
            mainContainer: document.querySelector(".main_container"),
            contentContainer: document.querySelector(".content_container"),
            leftSidebar: document.querySelector(".left_sidebar"),
            rightSidebar: document.querySelector(".right_sidebar"),
            statusUpdate: document.querySelector(".status_update__input"),
            feed: new Feed(),
      }
      return elements;
};
function createPostsFromServer() {
      fetch('http://127.0.0.1:3000')
            .then((data) => {
                  data.json()
                        .then((res) => {
                              console.log(res);
                              for (post of res.posts) {
                                    let newPost = new FeedItem(post);
                                    newPost.createNewPost();
                                    elements.feed.post.push(post)
                              }
                        });
            });
}