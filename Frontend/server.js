/**
 * Server to feed heroku static files, enables deploy with productionbuild.
 */

const express = require("express");
const path = require("path");
const port = process.env.PORT || 1234;
const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.get("/ping", function (req, res) {
  return res.send("pong");
});
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port, () => {
  console.log("listening on port " + port);
});
