import axios from "axios";

const baseURL = "/api/places";

const getAllPlaces = async () => {
  const response = await axios.get(baseURL);
  // console.log(response.data);
  return response.data;
};

export const initialQueryParameters = {
  tagList: "",
  languageFilter: "",
  tagFilterOrNot: "",
  pageSize: "",
  requestedPage: "",
  // allPlacesOrNot: true,
};

const getFilteredPlaces = async (queryParameters) => {
  const response = await axios.get(baseURL, {
    params: queryParameters,
  });
  // console.log(queryParameters);
  // console.log(response.data);
  return response.data;
};

// getFilteredPlaces(initialQueryParameters);

export default { getAllPlaces, getFilteredPlaces, initialQueryParameters };
