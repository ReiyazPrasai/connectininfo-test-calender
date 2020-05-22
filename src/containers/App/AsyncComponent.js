import loadable from "react-loadable";
import LoadingComponent from "../../components/Loading";

const asyncComponent = (importString) => {
  return {
    loader: () => import(`../${importString}/${importString}Container`),
    loading: LoadingComponent,
  };
};

const AsyncLayout = loadable({
  loader: () => import("../../components/Layout"),
  loading: LoadingComponent,
});

export default [
  AsyncLayout,
  false,
  [
    [loadable(asyncComponent("Auth")), ["login"], 1],
    [
      loadable(asyncComponent("Dashboard")),
      ["", "dashboard", "admin/", "admin"],
    ],
    [loadable(asyncComponent("Booking")), ["booking"]],
    [loadable(asyncComponent("Room")), ["room"]],
    [loadable(asyncComponent("Food")), ["food"]],
    [loadable(asyncComponent("Staff")), ["staff"]],
    [loadable(asyncComponent("Rate")), ["rate"]],
    [loadable(asyncComponent("Price")), ["price"]],
    [loadable(asyncComponent("Property")), ["property"]],
    [loadable(asyncComponent("Facility")), ["facility"]],
    [loadable(asyncComponent("Calendar")), ["calendar"]],
    [loadable(asyncComponent("Profile")), ["profile"]],
  ],
];

