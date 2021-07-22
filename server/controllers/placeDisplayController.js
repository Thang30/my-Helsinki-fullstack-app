const router = require("express").Router();
const { json } = require("express");
// const placeService = require("../services/place");
const myHelsinkiAPI = require("../external_api/myHelsinkiAPI");

router.get("/", async (req, res) => {
  // extract query strings and set their defaults if they are not found
  let { tagList, languageFilter, tagFilterOrNot, allPlacesOrNot } = req.query;
  if (!tagList) {
    tagList = [];
  }

  if (!languageFilter) {
    languageFilter = "en";
  }

  // parse the strings to boolean values
  if (!tagFilterOrNot) {
    tagFilterOrNot = true;
  } else {
    tagFilterOrNot = JSON.parse(tagFilterOrNot);
  }

  if (!allPlacesOrNot) {
    allPlacesOrNot = true;
  } else {
    allPlacesOrNot = JSON.parse(allPlacesOrNot);
  }

  // const limit = parseInt(pageSize);
  // const skip = (pageIndex - 1) * pageSize;

  try {
    const placesToDisplay = await myHelsinkiAPI.getPlacesFromAPI(
      tagList,
      languageFilter,
      tagFilterOrNot,
      allPlacesOrNot
    );
    res.json(placesToDisplay);
  } catch (error) {
    res.status(500).send(`Error! ${error}`);
  }
});

module.exports = router;
