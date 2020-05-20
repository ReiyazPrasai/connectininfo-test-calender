import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import {
  Button,
  Select,
  Form,
  Input,
  Modal,
  Row,
  Col,
  DatePicker,
} from "antd";

import { showBookingModel } from "../../../actions/layoutActions";

const FormItem = Form.Item;

const TransactionLimitModal = (props) => {
  const { isShowBookingModel, handleShowBookingModel } = props;

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

  const {
    resetFields,
    getFieldValue,
    validateFields,
    getFieldDecorator,
  } = props.form;

  const handleModalSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        handleShowBookingModel(false);
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
        width="25%"
        onOk={() => {
          handleShowBookingModel(false);
        }}
        onCancel={handleCancel}
        visible={isShowBookingModel}
        style={{ top: 180 }}
        footer={[
          <Button
            style={{ float: "left", border: 0, color: '#c5c5c5' }}
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
                  {}
                )(<Input style={{ width: "100%" }} placeholder={"Name"} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col xl={24} lg={24} md={24} sm={24}>
              <FormItem {...formLayout}>
                {getFieldDecorator(
                  "roomNo",
                  {}
                )(
                  <Select
                    style={{ width: "100%" }}
                    placeholder={"Select Room No"}
                  />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row gutter={32}>
            <Col xl={24} lg={24} md={28} sm={24}>
              <FormItem {...formLayout}>
                {getFieldDecorator(
                  "date",
                  {}
                )(<DatePicker style={{ width: "100%" }} placeholder={"Date Picker"} />)}
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
)(Form.create()(withRouter(TransactionLimitModal)));
