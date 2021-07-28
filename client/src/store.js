// this script plays no role in the current applicationCache, just something written as experimenting before

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import placeReducer from "./reducers/placeReducer";
import queryParameterReducer from "./reducers/queryParameterReducer";

const rootReducer = combineReducers({
  places: placeReducer,
  queryParameters: queryParameterReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
