import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { Button, Select, Form, Input, Modal, Row, Col, DatePicker } from "antd";

import history from "../../../utils/history";
import { getDateArray } from "../../../utils/commonUtils";
import { showBookingModel } from "../../../actions/layoutActions";
import { getLocalStorage, setLocalStorage } from "../../../utils/storageUtil";

const FormItem = Form.Item;
const Option = Select.Option;

const { RangePicker } = DatePicker;

const NewBookingModel = (props) => {
  const {
    isShowBookingModel,
    handleShowBookingModel,
    form: { resetFields, validateFields, getFieldDecorator },
  } = props;
  const {
    location: { pathname },
    push,
  } = history;

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

  const resourceMap = [
    { resourceId: 1, resourceTitle: "Room 105" },
    { resourceId: 2, resourceTitle: "Room 106" },
    { resourceId: 3, resourceTitle: "Room 107" },
    { resourceId: 4, resourceTitle: "Room 108" },
    { resourceId: 5, resourceTitle: "Room 201" },
    { resourceId: 6, resourceTitle: "Room 202" },
  ];

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    validateFields((err, values) => {
      if (!err) {
        formData.start = getDateArray(values.date[0]);
        formData.end = getDateArray(values.date[1]);
        formData.title = values.name;
        formData.resourceId = Number(values.roomNo);
        getLocalStorage("calendarEventList") instanceof Array
          ? setLocalStorage("calendarEventList", [
              ...getLocalStorage("calendarEventList"),
              formData,
            ])
          : setLocalStorage("calendarEventList", [formData]);
        resetFields();
        handleShowBookingModel(false);
        pathname === "/calendar"
          ? window.location.reload()
          : push("./calendar");
      }
    });
  };

  const handleCancel = () => {
    resetFields();
    handleShowBookingModel(false);
  };

  return (
    <Fragment>
      <Modal
        className="new-booking-modal-body"
        title={<span style={{ color: "#55c779" }}>Add Booking</span>}
        width={350}
        onOk={() => {
          handleShowBookingModel(false);
        }}
        onCancel={handleCancel}
        visible={isShowBookingModel}
        style={{ top: 180 }}
        footer={[
          <Button
            style={{ float: "left", border: 0, color: "#c5c5c5" }}
            key="back"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <div className="button-hover">
            <Button
              key="submit"
              style={{ backgroundColor: "#55c779", color: "white" }}
              onClick={handleModalSubmit}
            >
              Add
            </Button>
          </div>,
        ]}
        closable={false}
      >
        <Form
          onSubmit={handleModalSubmit}
          layout="vertical"
          className="new-booking-modal-input new-booking-modal-form-item "
        >
          <Row gutter={32}>
            <Col xl={24} lg={24} md={24} sm={24}>
              <FormItem {...formLayout}>
                {getFieldDecorator(
                  "name",
                  {
                    rules:[
                      {required: true,
                      message: 'Please enter your name'}
                    ]
                  }
                )(<Input style={{ width: "100%" }} placeholder={"Name"} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col xl={24} lg={24} md={24} sm={24}>
              <FormItem {...formLayout}>
                {getFieldDecorator(
                  "roomNo",
                  {rules:[
                    {required: true,
                    message: 'Please select a room'}
                  ]}
                )(
                  <Select
                    style={{ width: "100%" }}
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
            </Col>
          </Row>

          <Row gutter={32}>
            <Col xl={24} lg={24} md={28} sm={24}>
              <FormItem {...formLayout}>
                {getFieldDecorator("date", {rules:[
                      {required: true,
                      message: 'Please select start and end date'}

                    ]})(<RangePicker showTime style={{width:'100%'}}/>)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isShowBookingModel: state.layout.isShowBookingModel,
});

const mapDispatchToProps = (dispatch) => ({
  handleShowBookingModel: (isShown) => {
    dispatch(showBookingModel(isShown));
  },
  actions: bindActionCreators(Object.assign({}), dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(withRouter(NewBookingModel)));
