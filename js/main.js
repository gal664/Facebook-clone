class User {
    constructor(userObj) {
        this.name = userObj.name;
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
            // posterUserName: curUser.name, //when users from server works!!
            posterUserName: "Gal Yaniv",
            timeStamp: new Date().toLocaleTimeString(),
            postText: elements.statusUpdate.value,
            postTextEdits: [],
            likesCounter: 0,
            timeEdited: "",
            userLikedPost: false,
            deleted: false,
            comments: [],
        }
        this.postData = { ...this.defaultPostData, ...postObject };
        elements.feed.posts.push(this.postData);
    }
    createNewPost() {
        this.postElement = createElementFirst("div", "feed-item", elements.feed.element, "");
        this.postHeader = createElement("div", "feed-item__header", this.postElement, "");
        this.headerLeft = createElement("div", "header_left", this.postHeader, "");
        this.userprofilePic = createElement("div", "user_profile_pic", this.headerLeft, "");
        this.userNameContainer = createElement("div", "userName_container", this.headerLeft, "");
        this.user_name = createElement("span", "user_name", this.userNameContainer, this.postData.posterUserName);
        this.postTime = createElement("span", "postTimestamp", this.userNameContainer, this.postData.timeStamp);
        this.editTime = createElement("span", "editTimestamp", this.headerLeft, "");
        this.headerRight = createElement("div", "header_right", this.postHeader, "")
        this.removePostBtn = createElement("button", "remove_post_btn", this.headerRight, "Remove Post");
        this.post = createElement("div", "post_text", this.postElement, this.postData.postText);
        this.postActions = createElement("div", "post_actions", this.postElement, "");
        this.likeBtn = createElement("button", "like_btn", this.postActions, "Like");
        this.likesContainer = createElement("div", "likes_container", this.postElement, "");
        this.likesCounter = createElement("span", "likes_counter", this.likesContainer, `${this.postData.likesCounter} likes`);
        this.editPostBtn = createElement("button", "edit_post_button", this.postActions, "Edit");
        this.commentsContainer = createElement("div", "feed-item__comments_container", this.postElement, "");
        this.commentInputContainer = createElement("div", "comments_container__comment_input_container", this.commentsContainer, "");
        this.commentProfilePic = createElement("div", "user_profile_pic", this.commentInputContainer, "");
        this.commentInput = createElement("input", "comment_input", this.commentInputContainer, "");
        this.commentInput.setAttribute("placeholder", "Write a comment...")
        elements.statusUpdate.value = "";
        this.removePostBtn.addEventListener("click", (event) => {
            elements.feed.element.removeChild(this.postElement);
            this.postData.deleted = true;
        })
        this.editPostBtn.addEventListener("click", (event) => {
            this.editPostBtn.disabled = true;
            let currentPostText = this.post.innerText;
            let editPost = createElement("input", "edit_post", this.userNameContainer);
            this.postElement.replaceChild(editPost, this.post);
            editPost.value = currentPostText;
            editPost.focus();
            editPost.addEventListener('keydown', (event) => {
                let newPostText = editPost.value;
                if (event.key === "Enter") {
                    this.editPostBtn.disabled = false;
                    this.postElement.replaceChild(this.post, editPost);
                    this.post.innerText = newPostText;
                    this.editTime.innerText = `Last Edited: ${new Date().toLocaleTimeString()}`
                    this.postData.timeEdited = new Date().toLocaleTimeString()
                    this.postData.postTextEdits.push({ value: newPostText, time: this.postData.timeEdited });
                }
            })
        })
        this.likeBtn.addEventListener("click", (event) => {
            switch (this.postData.userLikedPost) {
                case false:
                    this.postData.likesCounter++;
                    this.postData.userLikedPost = true;
                    break;
                case true:
                    this.postData.likesCounter--;
                    this.postData.userLikedPost = false;
                    break;
            }
            this.likesCounter.innerText = `${this.postData.likesCounter} likes`;
        })
        this.commentInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter" && this.commentInput.value !== "") {
                let newComment = new FeedItemComment(this.commentInput.value);
                newComment.createNewComment(this.commentsContainer);
                this.postData.comments.push(newComment.commentData);
                this.commentInput.value = "";
            }
        });
    }

}

class FeedItemComment {
    constructor(comment) {
        this.commentData = {
            commenterUserName: "Gal Yaniv",
            timeStamp: new Date().toLocaleTimeString(),
            CommentText: comment,
            likesCounter: 0,
            userLikedComment: false,
            deleted: false,
        }
    }
    createNewComment(f) {
        this.commentElement = createElement("div", "feed-item__comment", f, "");
        this.userprofilePic = createElement("div", "user_profile_pic", this.commentElement, "");
        this.commentContainer = createElement("div", "commment_commentContainer", this.commentElement, "");
        this.comment = createElement("div", "commment_comment", this.commentContainer, this.commentData.CommentText);
        this.commentActionsContainer = createElement("div", "commment_commentActionsContainer", this.commentContainer, "");
        this.removeCommentBtn = createElement("span", "remove_comment_btn", this.commentActionsContainer, "Remove");
        this.likeBtn = createElement("span", "like_btn", this.commentActionsContainer, "Like");
        this.postTime = createElement("span", "postTimestamp", this.commentActionsContainer, this.commentData.timeStamp);
        this.likesCounter = createElement("span", "likes_counter", this.commentElement, `${this.commentData.likesCounter} likes`);
        this.removeCommentBtn.addEventListener("click", (event) => {
            f.removeChild(this.commentElement);
            this.commentData.deleted = true;
        })
        this.likeBtn.addEventListener("click", (event) => {
            switch (this.commentData.userLikedComment) {
                case false:
                    this.commentData.likesCounter++;
                    this.commentData.userLikedComment = true;
                    break;
                case true:
                    this.commentData.likesCounter--;
                    this.commentData.userLikedComment = false;
                    break;
            }
            this.likesCounter.innerText = `${this.commentData.likesCounter} likes`;
        })
    }
}
let elements;
let curUser;
document.addEventListener("DOMContentLoaded", function (event) { init() });
function init() {
    curUser = createUser();
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
function createUser() {
    fetch("https://jsonplaceholder.typicode.com/users/2")
        .then(res => res.json())
        .then(resObj => new User(resObj)
        )
};
function createPostsFromServer() {
    fetch('http://127.0.0.1:3000')
        .then((data) => {
            data.json()
                .then((res) => {
                    for (post of res.posts) {
                        let newPost = new FeedItem(post);
                        newPost.createNewPost();
                        if (newPost.postData.comments.length > 0 == true) {
                            for (comment of newPost.postData.comments) {
                                let newComment = new FeedItemComment(comment.CommentText);
                                newComment.createNewComment(newPost.commentsContainer);
                            }
                        }
                    }
                });
        });
}