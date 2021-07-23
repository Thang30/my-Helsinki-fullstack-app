const initialState = {
  tagList: "",
  languageFilter: "",
  tagFilterOrNot: "",
  pageSize: "",
  requestedPage: "",
  //   allPlacesOrNot: false,
};

const ACTIONS = {
  TAG_LIST: "TAG_LIST",
  LANGUAGE_FILTER: "LANGUAGE_FILTER",
  TAG_FILTER_OR_NOT: "TAG_FILTER_OR_NOT",
  PAGE_SIZE: "PAGE_SIZE",
  REQUESTED_PAGE: "REQUESTED_PAGE",
};

const queryParameterReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.TAG_LIST:
      return { ...state, tagList: action.tagList };
    case ACTIONS.LANGUAGE_FILTER:
      return { ...state, languageFilter: action.languageFilter };
    case ACTIONS.TAG_FILTER_OR_NOT:
      return { ...state, tagFilterOrNot: action.tagFilterOrNot };
    case ACTIONS.PAGE_SIZE:
      return { ...state, pageSize: action.pageSize };
    case ACTIONS.REQUESTED_PAGE:
      return { ...state, requestedPage: action.requestedPage };
    default:
      return state;
  }
};

export const setTagList = (data) => {
  return {
    type: "TAG_LIST",
    tagList: data,
  };
};

export const setLanguageFilter = (data) => {
  return {
    type: "LANGUAGE_FILTER",
    languageFilter: data,
  };
};

export const setTagFilterOrNot = (data) => {
  return {
    type: "TAG_FILTER_OR_NOT",
    tagFilterOrNot: data,
  };
};

export const setPageSize = (data) => {
  return {
    type: "PAGE_SIZE",
    pageSize: data,
  };
};

export const setRequestedPage = (data) => {
  return {
    type: "REQUESTED_PAGE",
    requestedPage: data,
  };
};

export default queryParameterReducer;
