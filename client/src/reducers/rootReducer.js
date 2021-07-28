import getDataFromServer from "../services/getDataFromServer";

const initialQueryParameters = {
  tagList: "",
  languageFilter: "",
  tagFilterOrNot: "",
  pageSize: "",
  requestedPage: "",
  allPlacesOrNot: false,
};

const ACTIONS = {
  INITIALIZE_ALL_PLACES: "INIT_PLACES",
  TAG_LIST: "TAG_LIST",
  LANGUAGE_FILTER: "LANGUAGE_FILTER",
  TAG_FILTER_OR_NOT: "TAG_FILTER_OR_NOT",
  PAGE_SIZE: "PAGE_SIZE",
  REQUESTED_PAGE: "REQUESTED_PAGE",
};

const rootReducer = (state = initialQueryParameters, action) => {
  switch (action.type) {
    case ACTIONS.INITIALIZE_ALL_PLACES:
      console.log(state);
      console.log(action.data);
      return action.data;
    case ACTIONS.TAG_LIST:
      console.log(state);
      console.log(action.data);
      return action.data;
    case ACTIONS.LANGUAGE_FILTER:
      console.log(state);
      console.log(action.data);
      return action.data;
    case ACTIONS.TAG_FILTER_OR_NOT:
      console.log(state);
      console.log(action.data);
      return action.data;
    case ACTIONS.PAGE_SIZE:
      console.log(state);
      console.log(action.data);
      return action.data;
    case ACTIONS.REQUESTED_PAGE:
      console.log(state);
      console.log(action.data);
      return action.data;
    default:
      break;
  }
};

export const initializePlaces = () => {
  return async (dispatch) => {
    const places = await getDataFromServer.getAllPlaces();
    dispatch({
      type: "INIT_PLACES",
      data: places.data,
    });
  };
};

export const setTagList = (newTags) => {
  return async (dispatch) => {
    const queryParameters = { ...initialQueryParameters, tagList: newTags };
    const places = await getDataFromServer.getFilteredPlaces(queryParameters);
    dispatch({
      type: "TAG_LIST",
      data: places.data,
    });
  };
};
