import React, { Fragment } from "react";
import { Modal, Form, Button, Select, Row, Col, DatePicker } from "antd";

import { getDateArray } from "../../utils/commonUtils";

const FormItem = Form.Item;
const Option = Select.Option;

const CalendarMenu = (props) => {
  const {
    setRoomNo,
    isMenuVisible,
    hideMenu,
    resourceMap,
    form: { resetFields, validateFields, getFieldDecorator },
  } = props;  

  console.log(resourceMap)

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

  const handleModalSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        const selectedRoom =
          values?.roomNo?.length > 0
            ? resourceMap.filter((room) => {
                return values.roomNo.includes(String(room.resourceId));
              })
            : resourceMap;
        setRoomNo(selectedRoom);
        hideMenu();
      }
    });
  };

  const handleCancel = () => {
    resetFields();
    setRoomNo(resourceMap)
    hideMenu();
  };

  return (
    <Fragment>
      <Modal
        className="new-booking-modal-body"
        title={<span style={{ color: "#55c779" }}>Menu</span>}
        width={350}
        onOk={() => {
          hideMenu();
        }}
        onCancel={handleCancel}
        visible={isMenuVisible}
        style={{ top: 80, left: '5%' }}
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
              Submit
            </Button>
          </div>,
        ]}
        closable={false}
      >
        <Form onSubmit={handleModalSubmit} layout="vertical">
          <FormItem
            style={{ width: "100%", marginBottom: "10px" }}
            {...formLayout}
          >
            {getFieldDecorator(
              "roomNo",
              {}
            )(
              <Select
                mode="multiple"
                placeholder={"Select Room No"}
              >
                {resourceMap instanceof Array && resourceMap?.map((resourceItem) => (
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
        </Form>
      </Modal>
    </Fragment>
  );
};

export default CalendarMenu;
