import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import TweetEmbed from "react-tweet-embed";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      tweet: "",
      counting: false,
      days: Number,
      hours: Number,
      mins: Number,
      secs: Number
    };
  }

  getTime = () => {
    const countdown = setInterval(() => {
      clearInterval(countdown);

      const now = moment();
      const targetDay = moment("2019-05-25 8", "YYYY-MM-DD H");
      // console.log(targetDay.format("DD-MM-YYYY H-m-s"));
      // console.log(now.format("DD-MM-YYYY H-m-s"));

      const timeTill = targetDay.diff(now, "seconds");

      if (timeTill < 0) {
        clearInterval(countdown);
        return;
      }

      const daysTill = Math.floor(timeTill / 86400);
      const remainderOne = timeTill % 86400;

      const hoursTill = Math.floor(remainderOne / 3600);
      const remainderTwo = remainderOne % 3600;

      const minsTill = Math.floor(remainderTwo / 60);
      const secsTill = remainderTwo % 60;

      this.setState({
        counting: true,
        days: daysTill,
        hours: hoursTill,
        mins: minsTill,
        secs: secsTill
      });

      // console.log(daysTill, hoursTill, minsTill, secsTill);
    }, 1000);
  };

  getTweets = days => {
    const daysHash = days;
    axios
      .post("/api", { days: daysHash })
      .then(res => {
        // console.log(res.data.id_str);
        this.setState({
          tweet: res.data.id_str
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    this.getTime();
    const { days, hours, mins, secs, counting, loading, tweet } = this.state;

    let hashtag;
    let time;
    if (counting === false) {
      hashtag = "...";
      time = "";
    } else {
      if (loading === true) {
        this.getTweets(days);
        this.setState({
          loading: false
        });
      }
      hashtag = (
        <h3>
          <strong>{`#${days}Days`}</strong>
          {" till "}
          <strong>MDW</strong>
        </h3>
      );

      time = `${days}D ${hours}H ${mins}M ${secs}S`;
    }

    // console.log(tweet);
    return (
      <div className="app">
        <div className="count-wrapper">
          <div className="countdown">
            <div className="hashtag">{hashtag}</div>
            <div className="time">
              <h3>{time}</h3>
            </div>
          </div>
        </div>

        <div className="tweet-wrapper">
          <TweetEmbed className="twit-tweet" id={tweet} />
        </div>
      </div>
    );
  }
}

export default App;
