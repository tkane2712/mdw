const express = require("express");
const router = express.Router();

const Twit = require("twit");
const config = require("./config");
const T = new Twit(config);

function randomNumber(limit) {
  return Math.floor(Math.random() * Math.floor(limit));
}

router.post("/api", (req, res) => {
  const days = req.body.days;

  const params = {
    // q: `${days}days`,
    q: `#${randomNumber(110)}days`,
    count: 15
  };

  T.get("search/tweets", params).then(result => {
    const randomNum = randomNumber(result.data.statuses.length);
    // console.log(result.data.statuses.length, randomNum);
    res.json(result.data.statuses[randomNum]);
  });
});

module.exports = router;

// const Twit = require("twit")
// const config = require("./keys/config");

// const T = new Twit(config);

// export const getTweets = days => {
//   console.log("action", days);
//   var params = {
//     q: `#${days}days`,
//     count: 3
//   };

//   T.get("search/tweets", params).then(res => console.log(res));
// };
