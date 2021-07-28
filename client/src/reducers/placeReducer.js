// this script plays no role in the current applicationCache, just something written as experimenting before

import getDataFromServerService from "../services/getDataFromServer";

const ACTIONS = {
  INITIALIZE_ALL_PLACES: "INIT_PLACES",
  GET_FILTERED_PLACES: "FILTERED_PLACES",
};

const placeReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.INITIALIZE_ALL_PLACES:
      console.log(state);
      console.log(action.data);
      return action.data;
    case ACTIONS.GET_FILTERED_PLACES:
      // console.log(state, action.data);
      return action.data;
    default:
      return state;
  }
};

export const initializePlaces = () => {
  return async (dispatch) => {
    const places = await getDataFromServerService.getAllPlaces();
    dispatch({
      type: "INIT_PLACES",
      data: places.data,
    });
  };
};

export const getQueryFilteredPlaces = () => (dispatch, getState) => {
  return async (dispatch) => {
    const queryParameters = getState().queryParameters;
    console.log(queryParameters);
    const filteredPlaces = await getDataFromServerService.getFilteredPlaces(
      queryParameters
    );
    dispatch({
      type: "FILTERED_PLACES",
      data: filteredPlaces.data,
    });
  };
};

export default placeReducer;
