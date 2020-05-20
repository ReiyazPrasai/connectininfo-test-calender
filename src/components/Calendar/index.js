import React, { useState } from "react";
import moment from "moment";
import { DatePicker, Form, Select } from "antd";
import { withRouter } from "react-router-dom";
import {
  Calendar,
  momentLocalizer,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import { getLocalStorage, setLocalStorage } from "../../utils/storageUtil";
import { getDateArray } from "../../utils/commonUtils";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);
const FormItem = Form.Item;
const Option = Select.Option;

const resourceMap = [
  { resourceId: 1, resourceTitle: "Room 105" },
  { resourceId: 2, resourceTitle: "Room 106" },
  { resourceId: 3, resourceTitle: "Room 107" },
  { resourceId: 4, resourceTitle: "Room 108" },
  { resourceId: 5, resourceTitle: "Room 201" },
  { resourceId: 6, resourceTitle: "Room 202" },
];

const MyCalender = (props) => {
  const {
    form: { getFieldValue, getFieldDecorator },
  } = props;

  const formLayout = {
    labelCol: {
      xl: { span: 8 },
      lg: { span: 9 },
      md: { span: 12 },
      sm: { span: 8 },
      xs: { span: 24 },
    },
    wrapperCol: {
      xl: { span: 15 },
      lg: { span: 12 },
      md: { span: 24 },
      sm: { span: 16 },
      xs: { span: 24 },
    },
    colon: false,
    labelAlign: "left",
  };

  const defaultDate = getFieldValue("date")
    ? new Date(...getDateArray(getFieldValue("date")))
    : new Date();
  const selectedRoom =
    getFieldValue("roomNo")?.length > 0
      ? resourceMap.filter((room) => {
          return getFieldValue("roomNo").includes(String(room.resourceId));
        })
      : resourceMap;
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

    setLocalStorage(
      "calendarEventList",
      getEventsForStorage(storageEvents),
      nextEvents
    );

    setEvents(nextEvents);
  };

  const resizeEvent = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    const storageEvents = [...nextEvents];

    setLocalStorage(
      "calendarEventList",
      getEventsForStorage(storageEvents),
      nextEvents
    );

    setEvents(nextEvents);
  };

  return (
    <>
      <h4>Calendar</h4>
      <hr />

      <Form style={{ width: "100%" }}>
        <FormItem
          style={{ width: "340px", marginBottom: "10px" }}
          {...formLayout}
        >
          {getFieldDecorator(
            "roomNo",
            {}
          )(
            <Select
              mode="multiple"
              style={{ minWidth: "250px", width: "auto" }}
              placeholder={"Select Room No"}
            >
              {resourceMap.map((resourceItem) => (
                <Option
                  key={resourceItem.resourceId}
                  values={resourceItem.resourceId}
                >
                  {resourceItem.resourceTitle}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem
          style={{ width: "340px", marginBottom: "10px" }}
          {...formLayout}
        >
          {getFieldDecorator(
            "date",
            {}
          )(<DatePicker style={{ width: "250px" }} />)}
        </FormItem>
      </Form>
      <hr />
      <div style={{ height: 600 }}>
        <DragAndDropCalendar
          selectable
          localizer={localizer}
          events={events}
          onEventDrop={moveEvent}
          resizable
          resources={selectedRoom}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
          onEventResize={resizeEvent}
          defaultView="day"
          step={15}
          defaultDate={defaultDate}
          date={defaultDate}
        />
      </div>
    </>
  );
};

export default Form.create()(withRouter(MyCalender));
