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
            if (event.key === "Enter" && elements.statusUpdate.value !== "") {
                  createNewPost(elements.statusUpdate.value);
            }
      });
}
//try and turn this into a class
function createNewPost(postText) {
      let userLikedPost = false;
      let newPost = document.createElement("div");
      newPost.className = "feed-item";
      elements.feed.insertBefore(newPost, elements.feed.firstChild);
      
      let postHeader = createElement("div", "feed-item__header", newPost, "");
      let headerLeft = createElement("div", "header_left", postHeader, "")
      let user_name = createElement("span", "user_name", headerLeft, "Gal Yaniv");// username is curently hard-coded
      let postTime = createElement("span", "postTimestamp", headerLeft, new Date().toLocaleTimeString());
      let editTime = createElement("span", "editTimestamp", headerLeft, "");
      let headerRight = createElement("div", "header_right", postHeader, "")
      let removePostBtn = createElement("button", "remove_post_btn", headerRight, "Remove Post");
      let post = createElement("div", "post_text", newPost, postText, "");
      let postActions = createElement("div", "post_actions", newPost, "");
      let likesContainer = createElement("div", "likes_container", postActions, "");
      let likeBtn = createElement("button", "like_btn", likesContainer, "Like");
      let likesCounter = createElement("span", "likes_counter", likesContainer, 0);
      let editPostBtn = createElement("button", "edit_post_button", postActions, "Edit");
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
                        editTime.innerText = `Last Edited: ${new Date().toLocaleTimeString()}`                        
                  }
            })
      })

      let likesIndex = likesCounter.innerText;
      likeBtn.addEventListener('click', (event) => {
            console.log(userLikedPost);
            switch (userLikedPost) {
                  case false:
                  console.log("false");
                  likesIndex++;
                  userLikedPost = true;
                  break;
                  case true:
                  console.log("true");
                  likesIndex--;
                  userLikedPost = false;
                  break;
            }
            console.log(likesIndex);
            likesCounter.innerText = likesIndex;
      })
      elements.statusUpdate.value = "";
      return newPost;
}

function createElement(t, c, f, txt) {
      let el = document.createElement(t);
      el.className = c;
      f.appendChild(el);
      el.innerText = txt;
      return el;
}