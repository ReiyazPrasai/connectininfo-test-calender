import React, { useState, useEffect } from "react";
import moment from "moment";
import { Form, Button, Row, Col } from "antd";
import { withRouter } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import Menu from "./Menu";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import { getLocalStorage, setLocalStorage } from "../../utils/storageUtil";
import { getDateArray } from "../../utils/commonUtils";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const resourceMap = [
  { resourceId: 1, resourceTitle: "Room 105" },
  { resourceId: 2, resourceTitle: "Room 106" },
  { resourceId: 3, resourceTitle: "Room 107" },
  { resourceId: 4, resourceTitle: "Room 108" },
  { resourceId: 5, resourceTitle: "Room 201" },
  { resourceId: 6, resourceTitle: "Room 202" },
];

const MyCalender = (props) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [roomNo, setRoomNo] = useState(resourceMap);

  const calendarEventList = getLocalStorage("calendarEventList") ?? [];

  const eventList =
    calendarEventList.length > 0
      ? calendarEventList?.map((event, index) => {
          return {
            id: index,
            title: event.title,
            start: new Date(...event.start),
            end: new Date(...event.end),
            resourceId: event.resourceId,
          };
        })
      : [];

  const [events, setEvents] = useState(eventList);

  const getEventsForStorage = (currentEvents) => {
    return [...currentEvents]?.map((event) => {
      const eventData = {};
      Object.assign(eventData, event);
      eventData.start = getDateArray(event.start);
      eventData.end = getDateArray(event.end);
      return eventData;
    });
  };

  const moveEvent = ({
    event,
    start,
    end,
    resourceId,
    isAllDay: droppedOnAllDaySlot,
  }) => {
    const idx = events.indexOf(event);
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = { ...event, start, end, resourceId, allDay };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);
    const storageEvents = [...nextEvents];

    setLocalStorage("calendarEventList", getEventsForStorage(storageEvents));

    setEvents(nextEvents);
  };

  const hideMenu = () => {
    setIsMenuVisible(false);
  };

  const resizeEvent = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    const storageEvents = [...nextEvents];

    setLocalStorage("calendarEventList", getEventsForStorage(storageEvents));

    setEvents(nextEvents);
  };

  return (
    <>
    <Row>
      <Col
        xl={{ span: 14 }}
        lg={{ span: 14 }}
        md={{ span: 14 }}
        sm={{ span: 18 }}
        xs={{ span: 18 }}
      >
        <h4>Calendar</h4>
      </Col>
      <Col
        xl={{ span: 10 }}
        lg={{ span: 10 }}
        md={{ span: 10 }}
        sm={{ span: 6 }}
        xs={{ span: 6 }}
      >
        <div className="button-hover" style={{ float: "right" }}>
          <Button
            style={{
              marginRight: "15px",
              backgroundColor: "#55c779",
              color: "white",
            }}
            onClick={() => {
              setIsMenuVisible(!isMenuVisible);
            }}
          >
            Menu
          </Button>
        </div>
      </Col>
    </Row>
    <hr />
    <div style={{ height: 600 }}>
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={events}
        onEventDrop={moveEvent}
        resizable
        resources={roomNo}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        onEventResize={resizeEvent}
        defaultView="day"
        step={15}
        showMultiDayTimes={true}
        defaultDate={new Date()}
      />
      <Menu
        resourceMap={roomNo}
        isMenuVisible={isMenuVisible}
        setRoomNo={setRoomNo}
        hideMenu={hideMenu}
        {...props}
      />
    </div>
    </>
  );
};
export default Form.create()(withRouter(MyCalender));
