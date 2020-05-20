import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import layoutReducer from "./layoutReducer";

import history from "../utils/history";

const appReducer = combineReducers({
  router: connectRouter(history),
  layout: layoutReducer,
});

const rootReducer = (state, action) => {
  if (action?.type === "LOG_OUT_SUCCESS") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
