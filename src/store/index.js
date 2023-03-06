import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import plantsReducer from "./plants/plantsReducers";
import wateringReducer from "./watering/wateringReducers";
import thunkMiddleware from "redux-thunk";

const composedEnhancer = compose(applyMiddleware(thunkMiddleware));

const rootReducer = combineReducers({
  plantsReducer,
  wateringReducer,
});

const store = createStore(rootReducer, composedEnhancer);
export default store;
