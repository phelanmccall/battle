const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
const router = require("express").Router();
router.use("/", function (req, res) {
      res.sendFile(path.join(__dirname, "./public/index.html"));
    
  });
  router.use("/favicon.ico", function(req, res) {
        res.sendFile(path.join(__dirname, "./public/favicon.ico"));
   });

app.use(router);

app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}` );
  }); 