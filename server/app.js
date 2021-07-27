const express = require("express");
const app = express();
const placeDisplayController = require("./controllers/placeDisplayController");

app.use("/api/places", placeDisplayController);

app.use("/", (req, res) => {
  res.redirect("/api/places");
});

module.exports = app;
