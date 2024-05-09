const express = require("express");
const router = express();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/states.html", (req, res) => {
  //   res.sendFile("./views/new-page.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "..", "views", "states.html"));
});

router.get("/old-page.html", (req, res) => {
  res.redirect(301, "/states.html");
});

module.exports = router;
