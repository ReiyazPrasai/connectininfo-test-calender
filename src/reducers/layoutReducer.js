import APP_CONFIG from "../constants/appConfig";
import {
  TOGGLE_COLLAPSED_NAV,
  SHOW_BOOKING_MODEL,
} from "../constants/actionTypes";

const INITIAL_STATE = APP_CONFIG.settings;

const layoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        collapsedNav: action.isCollapsedNav,
      };
    case SHOW_BOOKING_MODEL:
      return {
        ...state,
        isShowBookingModel: action.isShowBookingModel,
      };
    default:
      return state;
  }
};

export default layoutReducer;
