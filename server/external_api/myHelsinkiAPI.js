// const myHelsinkiapi = require("../util/myhelsinkiApi");
// const fetch = require("node-fetch");
require("dotenv").config();
const axios = require("axios");
const config = require("../utils/config");
const logger = require("../utils/logger");

const externalAPI = config.MY_HELSINKI_API_PLACES;

const getPlacesFromAPI = async (
  tagList,
  languageFilter,
  tagFilterOrNot = true,
  allPlacesOrNot = true
) => {
  try {
    if (allPlacesOrNot) {
      const response = await axios.get(`${externalAPI}`);
      logger.info(response.data);
      return response.data;
    } else {
      if (tagFilterOrNot) {
        const response = await axios.get(
          `${externalAPI}?tags_filter=${tagList}&language_filter=${languageFilter}`
        );
        logger.info(response.data);
        return response.data;
      } else {
        const response = await axios.get(
          `${externalAPI}?tags_search=${tagList}&language_filter=${languageFilter}`
        );
        logger.info(response.data);
        return response.data;
      }
    }
  } catch (error) {
    throw new Error(`Failed at data fetching from MyHelsinki Api:  ${error}`);
  }
};

const isOpen = (place) => {
  let isOpen = "No";

  const today = new Date().getDay();
  const currentTime = new Date().toLocaleTimeString("fi-FI", { hour12: false });

  //   if there's no info about opening hours, we assume it to be closed
  if (!place.opening_hours.hours) {
    isOpen = "No";
  }

  // find the opening hours of this place on today, if there's nothing then it's closed
  const openingHoursToday = place.opening_hours.hours.find(
    (day) => day.weekday_id === today
  );
  if (openingHoursToday === undefined) {
    isOpen = "No";
  }

  //   if it's open 24 hours then of course it's open now
  if (place.opening_hours.hours.open24h) {
    isOpen = "Yes";
  }

  // if current time is between opening and closing time then it's open
  if (
    openingHoursToday.opens <= currentTime &&
    openingHoursToday.closes >= currentTime
  ) {
    isOpen = "Yes";
  }

  place.opening_hours = isOpen;

  return {
    ...place,
    opening_hours: isOpen,
  };
};

module.exports = { getPlacesFromAPI, isOpen };
// getPlacesFromAPI("Vietnamese,Asian", "fi");
