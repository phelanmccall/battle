const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./build"));

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
