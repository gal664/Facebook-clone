const http = require('http');

let app = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  let resObject = {
    posts: [
      {
        posterUserName: "Moshe Moshe",
        timeStamp: "1:52:10 PM",
        postText: "What's up everyone? 1",
        postTextEdits: [],
        likesCounter: 6,
        timeEdited: "",
        userLikedPost: false,
        deleted: false,
        comments: []
      },
      {
        posterUserName: "Israel Israeli",
        timeStamp: "12:42:30 AM",
        postText: "That's a stupid name 2",
        postTextEdits: [],
        likesCounter: 109,
        timeEdited: "",
        userLikedPost: false,
        deleted: false,
        comments: []
      },
      {
        posterUserName: "Gal Yaniv",
        timeStamp: "10:00:10 AM",
        postText: "It's exactly 10:00 AM!!! 3",
        postTextEdits: [],
        likesCounter: 0,
        timeEdited: "",
        userLikedPost: false,
        deleted: false,
        comments: [
          {
            CommentText: "I'm fine y'know",
            commenterUserName: "Israel Israeli",
            deleted: false,
            likesCounter: 3,
            timeStamp: "11:29:48 PM",
            userLikedComment: true
          }
        ]
      },
    ]
  };

  res.end(JSON.stringify(resObject));
});

app.listen(3000, '127.0.0.1');
console.log('Server is running');