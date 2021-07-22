const express = require("express");
const app = express();
const config = require("./utils/config");
const logger = require("./utils/logger");
const placeDisplayController = require("./controllers/placeDisplayController");

// const port = commonObjects.PORT;

app.listen(config.PORT, () => {
  logger.info(`Server is listening on port ${config.PORT}`);
});

app.use("/api/places", placeDisplayController);

module.exports = app;
