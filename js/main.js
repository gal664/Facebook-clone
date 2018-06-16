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
            if (event.key === "Enter"){
                  postText = elements.statusUpdate.value;
                  let newPost = createElement("div", "feed-item", elements.feed);
                  newPost.innerText = postText;
                  elements.statusUpdate.value = "";
                  //add user name
                  //add remove post button
            }
          });
}
function createElement(t, c, f) {
      let el = document.createElement(t);
      el.className = c;
      f.appendChild(el);
      return el;
}
