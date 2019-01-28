const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const api = require("./api");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/public")));
app.use("/", api);

// serve static assets if in prod
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log(`Express running → PORT ${port}`);
});

// module.exports = app;
