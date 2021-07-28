const router = require("express").Router();
// const placeService = require("../services/place");
const myHelsinkiAPI = require("../external_api/myHelsinkiAPI");

router.get("/", async (req, res) => {
  // extract query strings and set their defaults if they are not found
  let { tagList, languageFilter, tagFilterOrNot, pageSize, requestedPage } =
    req.query;

  if (!tagList) {
    tagList = "all";
  }

  if (!languageFilter) {
    languageFilter = "en";
  }

  // parse the strings to boolean values
  if (!tagFilterOrNot) {
    tagFilterOrNot = false;
  } else {
    tagFilterOrNot = JSON.parse(tagFilterOrNot);
  }

  if (!pageSize) {
    pageSize = 10;
  }

  if (!requestedPage) {
    requestedPage = 1;
  }

  const startItemIndex = (requestedPage - 1) * pageSize;

  try {
    const filteredPlaces = await myHelsinkiAPI.getPlacesFromAPI(
      tagList,
      languageFilter,
      tagFilterOrNot,
      pageSize,
      startItemIndex
    );
    filteredPlaces.data.forEach((place) => {
      myHelsinkiAPI.isOpen(place);
    });
    const numOfPlaces = filteredPlaces.meta.count;
    const numOfPages = Math.ceil(numOfPlaces / pageSize);
    // we want to send to the client both the place data and the meta data for pagination
    res.send({
      meta: { pageSize, numOfPlaces, numOfPages, requestedPage },
      data: filteredPlaces.data,
    });
  } catch (error) {
    res.status(500).send(`Error! ${error}`);
  }
});

module.exports = router;
