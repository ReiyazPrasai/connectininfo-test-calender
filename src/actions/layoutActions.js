import { TOGGLE_COLLAPSED_NAV, SHOW_BOOKING_MODEL } from "../constants/actionTypes";

export const toggleCollapsedNav = (isCollapsedNav) => {
  return { type: TOGGLE_COLLAPSED_NAV, isCollapsedNav: isCollapsedNav };
};

export const showBookingModel = (isShown) => {
  return { type: SHOW_BOOKING_MODEL, isShowBookingModel: isShown };
};
