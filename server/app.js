const express = require("express");
const app = express();
const placeDisplayController = require("./controllers/placeDisplayController");

app.use("/api/places", placeDisplayController);

module.exports = app;
