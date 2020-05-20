import loadable from "react-loadable";
import LoadingComponent from "../../components/Loading";

export const AsyncLayout = loadable({
  loader: () => import("../../components/Layout"),
  loading: LoadingComponent,
});

export const AsyncLoginForm = loadable({
  loader: () => import("../../containers/Auth/LoginContainer"),
  loading: LoadingComponent,
});

export const AsyncDashboard = loadable({
  loader: () => import("../Dashboard/DashboardContainer"),
  loading: LoadingComponent,
});

export const AsyncBooking = loadable({
  loader: () => import("../Booking/BookingContainer"),
  loading: LoadingComponent,
});
export const AsyncRoom = loadable({
  loader: () => import("../Room/RoomContainer"),
  loading: LoadingComponent,
});
export const AsyncFood = loadable({
  loader: () => import("../Food/FoodContainer"),
  loading: LoadingComponent,
});
export const AsyncStaff = loadable({
  loader: () => import("../Staff/StaffContainer"),
  loading: LoadingComponent,
});
export const AsyncRate = loadable({
  loader: () => import("../Rate/RateContainer"),
  loading: LoadingComponent,
});
export const AsyncPrice = loadable({
  loader: () => import("../Price/PriceContainer"),
  loading: LoadingComponent,
});
export const AsyncProperty = loadable({
  loader: () => import("../Property/PropertyContainer"),
  loading: LoadingComponent,
});
export const AsyncFacility = loadable({
  loader: () => import("../Facility/FacilityContainer"),
  loading: LoadingComponent,
});
export const AsyncCalendar = loadable({
  loader: () => import("../Calendar/CalendarContainer"),
  loading: LoadingComponent,
});
export const AsyncProfile = loadable({
  loader: () => import("../Profile/ProfileContainer"),
  loading: LoadingComponent,
});
