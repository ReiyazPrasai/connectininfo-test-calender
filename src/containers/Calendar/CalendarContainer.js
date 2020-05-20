import React, { Component } from "react";

import Calendar from "../../components/Calendar";

export class CalendarContainer extends Component {
  render() {
    return <Calendar {...this.props} />;
  }
}

export default CalendarContainer;
