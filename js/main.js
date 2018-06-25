class User {
      constructor() {
            this.name = `Gal Yaniv`;
      }
      getUserName() {
            return this.name;
      }
};
//make the event listeners work
class FeedItem {
      constructor(postObject) {
            this.postElement = null;
            this.defaultPostData = {
                  posterUserName: curUser.name,
                  timeStamp: new Date().toLocaleTimeString(),
                  postText: elements.statusUpdate.value,
                  likesCounter: 0,
                  timeEdited: "",
                  userLikedPost: false
            }

            this.postData = { ...this.defaultPostData, ...postObject };
            console.log(this.postData);
      }
      createNewPost() {
            this.postElement = document.createElement("div");
            this.postElement.className = "feed-item";
            elements.feed.insertBefore(this.postElement, elements.feed.firstChild);
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
                  elements.feed.removeChild(this.postElement);
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
let curUser = new User;
document.addEventListener("DOMContentLoaded", function (event) { init() });
function init() {
      elements = getElements();
      console.log(elements);
      elements.statusUpdate.addEventListener('keydown', (event) => {
            if (event.key === "Enter" && elements.statusUpdate.value !== "") {
                  let newPost = new FeedItem;
                  newPost.createNewPost(elements.statusUpdate.value);
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
            feed: document.querySelector(".main_feed__feed"),
      }
      return elements;
};